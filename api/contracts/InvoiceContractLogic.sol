// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./GoodStandingToken.sol";
import "./DerogatoryToken.sol";

contract InvoiceContractLogic {
    enum Status { Pending, Active, Late, Paid }

    struct Invoice {
        address payable payer;
        address payable payee;
        uint256 amount;
        uint256 Fee;
        uint256 creationDate;
        uint256 dueDate;
        Status status;
        uint256 approvals;
    }

    GoodStandingToken public goodStandingToken;
    DerogatoryToken public derogatoryToken;

    function initialize(GoodStandingToken _goodStandingToken, DerogatoryToken _derogatoryToken) public {
        goodStandingToken = _goodStandingToken;
        derogatoryToken = _derogatoryToken;
    }

    mapping(uint256 => Invoice) public invoices;
    uint256 public nextInvoiceId;

    function createInvoice(address payable _payer, uint256 _amount, uint256 _Fee, uint256 _dueDate) public {
        require(msg.sender != _payer, "Payer and payee cannot be the same.");
        invoices[nextInvoiceId] = Invoice({
            payer: _payer,
            payee: payable(msg.sender),
            amount: _amount,
            Fee: _Fee,
            creationDate: block.timestamp,
            dueDate: _dueDate,
            status: Status.Pending,
            approvals: 0
        });
        nextInvoiceId++;
    }

    function approveInvoice(uint256 _invoiceId) public {
        Invoice storage invoice = invoices[_invoiceId];
        require(msg.sender == invoice.payer || msg.sender == invoice.payee, "Only involved parties can approve the invoice.");
        require(invoice.status == Status.Pending, "Invoice is not pending.");
        invoice.approvals++;
        if (invoice.approvals >= 2) {
            invoice.status = Status.Active;
        }
    }

    event AboutToMint(address to, uint256 tokenId);


    function payInvoice(uint256 _invoiceId) public payable {
    Invoice storage invoice = invoices[_invoiceId];
    require(msg.sender == invoice.payer, "Only the payer can pay the invoice.");
    require(invoice.status == Status.Active, "Invoice is not active.");
    uint256 amountToPay = invoice.amount;
    if (block.timestamp > invoice.dueDate) {
        amountToPay += invoice.Fee;
        invoice.status = Status.Late;
    }
    require(msg.value == amountToPay, "Incorrect payment amount.");
    
    // Check if the transfer is successful
    (bool success, ) = invoice.payee.call{value: msg.value}("");
    require(success, "Transfer failed.");


    emit AboutToMint(invoice.payer, _invoiceId);
    invoice.status = Status.Paid;
    goodStandingToken.mint(invoice.payer, _invoiceId);
}


   function issueDerogatoryNFT(uint256 _invoiceId) public {
    Invoice storage invoice = invoices[_invoiceId];
    require(msg.sender == invoice.payee, "Only the payee can issue a derogatory NFT.");
    require(invoice.status != Status.Paid, "Invoice has been paid.");
    require(block.timestamp > invoice.dueDate, "The due date has not been passed");

    // This will revert if the token has already been minted
    address owner = derogatoryToken.ownerOf(_invoiceId);
    require(owner == address(0), "A derogatory NFT has already been issued for this invoice.");

    // Mint a Derogatory NFT to the payer.
    derogatoryToken.mint(invoice.payer, _invoiceId);
}

function removeDerogatoryNFT(uint256 _invoiceId) public {
    Invoice storage invoice = invoices[_invoiceId];
    require(msg.sender == invoice.payee, "Only the payee can remove a derogatory NFT.");

    // This will revert if the token has not been minted
    address owner = derogatoryToken.ownerOf(_invoiceId);
    require(owner == invoice.payer, "No derogatory NFT has been issued for this invoice.");

    // Burn the Derogatory NFT.
    derogatoryToken.burn(_invoiceId);
}


}
