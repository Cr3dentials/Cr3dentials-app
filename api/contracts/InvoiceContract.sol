// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./InvoiceContractLogic.sol";
import "./GoodStandingToken.sol";
import "./DerogatoryToken.sol";

contract InvoiceContract is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    InvoiceContractLogic public logic;
    GoodStandingToken public goodStandingToken;
    DerogatoryToken public derogatoryToken;



   function initialize(address ownerAddress,address _logic, address _goodStandingToken, address _derogatoryToken) initializer public {
    __UUPSUpgradeable_init();
    __Ownable_init(ownerAddress);
    logic = InvoiceContractLogic(_logic);
    goodStandingToken = GoodStandingToken(_goodStandingToken);
    derogatoryToken = DerogatoryToken(_derogatoryToken);
}



    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {
        // The onlyOwner modifier ensures that only the owner can call this function.
        logic = InvoiceContractLogic(newImplementation);
    }

     function createInvoice(address payable _payer, uint256 _amount, uint256 _Fee, uint256 _dueDate) public {
    (bool success,) = address(logic).delegatecall(abi.encodeWithSignature("createInvoice(address,uint256,uint256,uint256)", _payer, _amount, _Fee, _dueDate));
    require(success, "createInvoice failed");
}

function approveInvoice(uint256 _invoiceId) public {
    (bool success,) = address(logic).delegatecall(abi.encodeWithSignature("approveInvoice(uint256)", _invoiceId));
    require(success, "approveInvoice failed");
}

function payInvoice(uint256 _invoiceId) public payable {
    // Transfer the ETH to this contract
    (bool success,) = payable(address(this)).call{value: msg.value}("");
    require(success, "Transfer failed.");

    // Now call the payInvoice function
    (success,) = address(logic).delegatecall(abi.encodeWithSignature("payInvoice(uint256)", _invoiceId));
    require(success, "payInvoice failed");
}


function issueDerogatoryNFT(uint256 _invoiceId) public {
    (bool success,) = address(logic).delegatecall(abi.encodeWithSignature("issueDerogatoryNFT(uint256)", _invoiceId));
    require(success, "issueDerogatoryNFT failed");
}

function removeDerogatoryNFT(uint256 _invoiceId) public {
    (bool success,) = address(logic).delegatecall(abi.encodeWithSignature("removeDerogatoryNFT(uint256)", _invoiceId));
    require(success, "removeDerogatoryNFT failed");
}


}
