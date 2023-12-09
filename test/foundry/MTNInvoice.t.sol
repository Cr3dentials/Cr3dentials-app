// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {InvoiceContract} from "api/contracts/readyForTesting/MTNInvoiceContract.sol";
contract MTNInvoice is Test {
    InvoiceContract public invoiceContract;
    address public platformAddress = vm.addr(1);

    function setUp() public {
        invoiceContract = new InvoiceContract(platformAddress);
    }

    function test_createInvoice() public {
        uint invoiceId = 1;
        uint dueDate = 1702047418556;
        uint amount = 100;
        address payable payer = payable(vm.addr(2));
        address sender = address(this);
        invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

        // Accessing the Invoice
        (uint id, uint dd, uint amt, string memory status, address invoicer, address pyr) = invoiceContract.invoices(invoiceId);

        assertEq(id, invoiceId);
        assertEq(dd, dueDate);
        assertEq(amt, amount);
        assertEq(invoicer, sender);
        assertEq(pyr, payer);
    }

    function testFuzz_createInvoice(uint invoiceId, uint dueDate, uint amount, address payable payer) public {
        address sender = address(this);
        invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

        // Accessing the Invoice
        (uint id, uint dd, uint amt, string memory status, address invoicer, address pyr) = invoiceContract.invoices(invoiceId);

        assertEq(id, invoiceId);
        assertEq(dd, dueDate);
        assertEq(amt, amount);
        assertEq(invoicer, sender);
        assertEq(pyr, payer);
    }

    /** TODO
    Should you be able to create a duplicate invoice with different data?
    If so, what data can be different? */
    function test_createInvoiceDuplicate() public {
        uint invoiceId = 1;
        uint dueDate = 1702047418556;
        uint amount = 100;
        address payable payer = payable(vm.addr(2));
        address sender = address(this);
        invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

        uint amountDup = 200;
        invoiceContract.createInvoice(invoiceId, dueDate, amountDup, payer);

        // Accessing the Invoice
        (uint id, uint dd, uint amt, string memory status, address invoicer, address pyr) = invoiceContract.invoices(invoiceId);

        assertEq(id, invoiceId);
        assertEq(dd, dueDate);
        assertEq(amt, amountDup);
        assertEq(invoicer, sender);
        assertEq(pyr, payer);
    }

    function test_markAsPaid() public{
      uint invoiceId = 1;
      uint dueDate = 1702047418556;
      uint amount = 100;
      address payable payer = payable(vm.addr(2));
      address sender = address(this);
      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      //mark as paid as platform address
      vm.prank(platformAddress);
      invoiceContract.markAsPaid(invoiceId);

      // Accessing the Invoice
      (uint id, uint dd, uint amt, string memory status, address invoicer, address pyr) = invoiceContract.invoices(invoiceId);
      assertEq(status, "Paid");
    }

    function testFail_markAsPaidForNonExistentInvoice() public{
      uint invoiceId = 1;
      uint dueDate = 1702047418556;
      uint amount = 100;
      address payable payer = payable(vm.addr(2));
      address sender = address(this);

      //mark as paid as platform address
      vm.prank(platformAddress);
      invoiceContract.markAsPaid(invoiceId);

      // Accessing the Invoice
      (uint id, uint dd, uint amt, string memory status, address invoicer, address pyr) = invoiceContract.invoices(invoiceId);
      assertEq(status, "Paid");
    }

    function testFail_markAsPaidForInvalidPlatformAddress() public{
      uint invoiceId = 1;
      uint dueDate = 1702047418556;
      uint amount = 100;
      address payable payer = payable(vm.addr(2));
      address sender = address(this);

      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      //mark as paid
      invoiceContract.markAsPaid(invoiceId);

      // Accessing the Invoice
      (uint id, uint dd, uint amt, string memory status, address invoicer, address pyr) = invoiceContract.invoices(invoiceId);
      assertEq(status, "Paid");
    }

}
