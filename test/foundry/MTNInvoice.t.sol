// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {InvoiceContract} from "api/contracts/readyForTesting/MTNInvoiceContract.sol";
contract MTNInvoiceTest is Test {
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
        (uint id, uint dd, uint amt, address invoicer,
        address pyr, uint256 datePaid, InvoiceContract.PaymentStatus paymentStatus,
        InvoiceContract.PaymentPhase paymentPhase) = invoiceContract.invoices(invoiceId);

        assertEq(id, invoiceId);
        assertEq(dd, dueDate);
        assertEq(amt, amount);
        assertEq(invoicer, sender);
        assertEq(pyr, payer);
        assertEq(datePaid, 0);
        assertTrue(paymentStatus == InvoiceContract.PaymentStatus.UNPAID);
        assertTrue(paymentPhase == InvoiceContract.PaymentPhase.PENDING);


    }

    function testFuzz_createInvoice(uint invoiceId, uint dueDate, uint amount, address payable payer) public {
        vm.assume(amount > 0 ether);
        vm.assume(dueDate> 86400);

        address sender = address(this);
        invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

          // Accessing the Invoice
        (uint id, uint dd, uint amt, address invoicer,
        address pyr, uint256 datePaid, InvoiceContract.PaymentStatus paymentStatus,
        InvoiceContract.PaymentPhase paymentPhase) = invoiceContract.invoices(invoiceId);

        assertEq(id, invoiceId);
        assertEq(dd, dueDate);
        assertEq(amt, amount);
        assertEq(invoicer, sender);
        assertEq(pyr, payer);
        assertEq(datePaid, 0);
        assertTrue(paymentStatus == InvoiceContract.PaymentStatus.UNPAID);
        assertTrue(paymentPhase == InvoiceContract.PaymentPhase.PENDING);
    }

    // /** TODO
    // Should you be able to create a duplicate invoice with different data?
    // If so, what data can be different? */
    // function test_createInvoiceDuplicate() public {
    //     uint invoiceId = 1;
    //     uint dueDate = 1702047418556;
    //     uint amount = 100;
    //     address payable payer = payable(vm.addr(2));
    //     address sender = address(this);


    //     invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

    //     uint amountDup = 200;
    //     invoiceContract.createInvoice(invoiceId, dueDate, amountDup, payer);

    //     // Accessing the Invoice
    //     (uint id, uint dd, uint amt, string memory status, address invoicer, address pyr) = invoiceContract.invoices(invoiceId);

    //     assertEq(id, invoiceId);
    //     assertEq(dd, dueDate);
    //     assertEq(amt, amountDup);
    //     assertEq(status, "Active");
    //     assertEq(invoicer, sender);
    //     assertEq(pyr, payer);
    // }

    function test_markAsPaid() public{
      uint invoiceId = 1;
      uint dueDate = 1702047418556;
      uint amount = 100;
      address payable payer = payable(vm.addr(2));

      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      //mark as paid
      invoiceContract.updateInvoicePaymentInfo(invoiceId,dueDate);

      // Accessing the Invoice
      (,,,,,,InvoiceContract.PaymentStatus status,) = invoiceContract.invoices(invoiceId);
      assertTrue(status==InvoiceContract.PaymentStatus.PAID);
    }

    function testFuzz_markAsPaid(
      uint invoiceId,
      uint dueDate,
      uint amount,
      address payable payer,
      uint datePaid)
      public{

      vm.assume(amount > 0 ether);
      vm.assume(dueDate > 86400);
      vm.assume(dueDate> 86400);
      vm.assume(datePaid > 86400);
      vm.assume(invoiceId > 0);


       //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      //mark as paid
      invoiceContract.updateInvoicePaymentInfo(invoiceId,dueDate);

      // Accessing the Invoice
      (,,,,,,InvoiceContract.PaymentStatus status,) = invoiceContract.invoices(invoiceId);
      assertTrue(status==InvoiceContract.PaymentStatus.PAID);
    }

    function test_markAsPaidForNonExistentInvoice() public{
      uint invoiceId = 1;
      uint dueDate = block.timestamp;

      //mark as paid
      vm.expectRevert(bytes("This invoice does not exist"));
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate);
    }

    function testFuzz_markAsPaidRevertsForNonExistentInvoice(
      uint invoiceId,
      uint dueDate
    ) public{
      //mark as paid
      vm.assume(dueDate> 86400);


      vm.expectRevert(bytes("This invoice does not exist"));
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate);

    }


    function test_markAsPaidAlreadyPaidReverts() public{
      uint invoiceId = 1;
      uint dueDate = 1702047418556;
      uint amount = 100;
      address payable payer = payable(vm.addr(2));

      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      //mark as paid
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate);

      //mark as paid twice should fail
      vm.expectRevert(bytes("This invoice is already marked as paid"));
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate);
    }

    function testFuzz_markAsPaidDupeReverts(
      uint invoiceId,
      uint dueDate,
      uint amount,
      uint datePaid,
      address payable payer
    ) public{
      vm.assume(amount > 0 ether);
      vm.assume(dueDate > 86400);
      vm.assume(datePaid > 86400);
      vm.assume(invoiceId > 0);

      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      //mark as paid
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate);

      //mark as paid twice should fail
      vm.expectRevert(bytes("This invoice is already marked as paid"));
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate);
    }

    function test_markAsPaidTokenIncrement() public{
      uint invoiceId = 1;
      uint dueDate = 1702047418556;
      uint amount = 100;
      address payable payer = payable(vm.addr(2));

      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      (uint paidTokensBefore,,,) = invoiceContract.creditScores(payer);

      //mark as paid at the same time it was due
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate);

      (uint paidTokensAfter,,,) = invoiceContract.creditScores(payer);

      assertEq(paidTokensAfter, paidTokensBefore+1);
    }

    function testFuzz_markAsPaidTokenIncrementNoDupes(
      uint invoiceId,
      uint dueDate,
      uint amount,
      uint datePaid,
      address payable payer
    ) public{
      vm.assume(amount > 0 ether);
      vm.assume(dueDate > 86400);
      vm.assume(datePaid > 86400);
      vm.assume(invoiceId > 0);

      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      (uint paidTokensBefore,,,) = invoiceContract.creditScores(payer);

      //mark as paid at the same time of the dueDate
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate);


      //mark as paid twice should fail
      vm.expectRevert(bytes("This invoice is already marked as paid"));
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate);

      (uint paidTokensAfter,,,) = invoiceContract.creditScores(payer);
      assertEq(paidTokensAfter, paidTokensBefore+1);
    }

    function test_markAsPaidEarly() public{
      uint invoiceId = 1;
      uint dueDate = 1702047418556;
      uint amount = 100;
      address payable payer = payable(vm.addr(2));

      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      ( , uint paidEarlyTokensBefore,,) = invoiceContract.creditScores(payer);


      //mark as paid
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate-86401);


      // Accessing the Invoice
      ( , uint paidEarlyTokensAfter,,) = invoiceContract.creditScores(payer);

      assertEq(paidEarlyTokensAfter, paidEarlyTokensBefore+1);
    }

    function testFuzz_markAsPaidEarly(
      uint invoiceId,
      uint dueDate,
      uint amount,
      uint datePaid,
      address payable payer
    ) public{
      vm.assume(amount > 0 ether);
      vm.assume(dueDate > 86400);
      vm.assume(datePaid > 86400);
      vm.assume(invoiceId > 0);

      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      ( , uint paidEarlyTokensBefore,,) = invoiceContract.creditScores(payer);


      //mark as paid
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate-86401);


      // Accessing the Invoice
      ( , uint paidEarlyTokensAfter,,) = invoiceContract.creditScores(payer);

      assertEq(paidEarlyTokensAfter, paidEarlyTokensBefore+1);
    }





    function test_markAsLate() public{
      uint invoiceId = 1;
      uint dueDate = block.timestamp-1;
      uint amount = 100;
      address payable payer = payable(vm.addr(2));

      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      ( , , uint lateTokensBefore,) = invoiceContract.creditScores(payer);


      //mark as late
      invoiceContract.updateInvoicePaymentInfo(invoiceId, dueDate+86401);

      // Accessing the Invoice
      ( , , uint lateTokensAfter,) = invoiceContract.creditScores(payer);

      assertEq(lateTokensBefore+1, lateTokensAfter);
    }

    function testFuzz_markAsLate(uint invoiceId,
      uint dueDate,
      uint amount,
      uint datePaid,
      address payable payer
    ) public{
      vm.assume(amount > 0 ether);
      vm.assume(dueDate > 86400);
      vm.assume(datePaid > dueDate);
      vm.assume(invoiceId > 0);
      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      ( , , uint lateTokensBefore,) = invoiceContract.creditScores(payer);


      //mark as late
      invoiceContract.updateInvoicePaymentInfo(invoiceId, datePaid);

      // Accessing the Invoice
      ( , , uint lateTokensAfter,) = invoiceContract.creditScores(payer);

      assertEq(lateTokensBefore+1, lateTokensAfter);
    }

    function testFuzz_markAsOverdue(
      uint invoiceId,
      uint dueDate,
      uint amount,
      uint datePaid,
      address payable payer
    ) public{
      vm.assume(amount > 0 ether);
      vm.assume(dueDate < block.timestamp);
      vm.assume(datePaid > dueDate);
      vm.assume(invoiceId > 0);
      //create invoice
      invoiceContract.createInvoice(invoiceId, dueDate, amount, payer);

      ( , , , uint overDueTokensBefore) = invoiceContract.creditScores(payer);

      //mark as late
      invoiceContract.markAsOverdue(invoiceId);

      // Accessing the Invoice
      ( , , , uint overDueTokensAfter) = invoiceContract.creditScores(payer);

      assertEq(overDueTokensBefore+1, overDueTokensAfter);
    }




}
