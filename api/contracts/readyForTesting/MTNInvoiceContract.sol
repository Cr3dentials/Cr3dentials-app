pragma solidity ^0.8.22;

contract InvoiceContract {
    /**TODO
    - change Status from string to enum as seen in the comments
    - create events for activities such as createInvoice etc
    - discuss the difference between late and overdue
     */
    enum PaymentStatus { UNPAID, PAID }
    enum PaymentTiming { NOTSET, EARLY, ONTIME, LATE}

    struct Invoice {
        uint id;
        uint dueDate;
        uint amount;
        address payable invoicer;
        address payable payer;
        uint datePaid;
        PaymentStatus paymentStatus;
        PaymentTiming paymentTiming;
    }

    struct CreditScore {
        uint paidTokens;
        uint paidEarlyTokens;
        uint lateTokens;
        uint overdueTokens;
    }

    mapping(uint => Invoice) public invoices;
    mapping(address => CreditScore) public creditScores;

    address public platformAddress;

    constructor(address _platformAddress) {
        platformAddress = _platformAddress;
    }

    /**TODO
    who's calling this function? if it's not always going to be the company then the invoicer should be sent
    how would we deal with amounts given that the invoice would be paid with different real world currency amounts
    does the currency need to be stored*/
    function createInvoice(uint _id, uint _dueDate, uint _amount, address payable _payer) public {
        require(invoices[_id].id == 0, "An invoice with this ID has already been created");
        require(_amount > 0, "Invoice amount must be greater than 0");
        invoices[_id] = Invoice(
            _id,
            _dueDate,
            _amount,
            payable(msg.sender),
            _payer,
            0,
            PaymentStatus.UNPAID,
            PaymentTiming.NOTSET
        );
    }

    /*
    *TODO
    increment creditscore tokens
    do we only upgrade when the total amount is paid?
    */
    function updateInvoicePaymentInfo(uint _id, uint datePaid) public {
        require(datePaid>0, "date paid cannot be zero");
        require(invoices[_id].id == 0, "This invoice does not exist");
        require(invoices[_id].paymentStatus != PaymentStatus.PAID, "This invoice is already marked as paid");

        uint aDay = 86400;

        PaymentTiming timing = (datePaid > invoices[_id].dueDate)
            ? PaymentTiming.LATE
            :((datePaid < invoices[_id].dueDate - aDay) ? PaymentTiming.EARLY : PaymentTiming.ONTIME);

        invoices[_id].datePaid = datePaid;
        invoices[_id].paymentStatus = PaymentStatus.PAID;
        invoices[_id].paymentTiming = timing;

    }

    // function markAsPaid(uint _id) public {
    //     require(msg.sender == platformAddress, "Only the platform can mark the invoice as paid");

    //     Invoice storage invoice = invoices[_id];

    //     require(invoice.id == _id && invoice.amount > 0, "This invoice is invalid");
    //     require(keccak256(abi.encodePacked(invoice.status)) != keccak256(abi.encodePacked("Paid"))
    //     &&
    //     keccak256(abi.encodePacked(invoice.status)) != keccak256(abi.encodePacked("Paid Early")),
    //     "Invoice already marked as paid");

    //     // invoice.status = Status.PAID;
    //     invoice.status = "Paid";
    //     creditScores[invoice.payer].paidTokens++;
    // }

    // /** TODO
    // - discuss whether the contract should decide whether something was paid early,
    // instead of the caller (which may be centralized) */
    // function markAsPaidEarly(uint _id) public {
    //     require(msg.sender == platformAddress, "Only the platform can mark the invoice as paid early");

    //     Invoice storage invoice = invoices[_id];

    //     require(invoice.id == _id && invoice.amount > 0, "This invoice is invalid");
    //     require(keccak256(abi.encodePacked(invoice.status)) != keccak256(abi.encodePacked("Paid"))
    //     &&
    //     keccak256(abi.encodePacked(invoice.status)) != keccak256(abi.encodePacked("Paid Early")),
    //     "Invoice already marked as paid");

    //     // invoice.status = Status.PAID_EARLY;
    //     invoice.status = "Paid Early";
    //     creditScores[invoice.payer].paidEarlyTokens++;
    // }

    // /** TODO
    // - discuss why the payer marks the invoice as late */
    // function markAsLate(uint _id) public {
    //     require(block.timestamp > invoices[_id].dueDate, "The due date has not passed");

    //     Invoice storage invoice = invoices[_id];

    //     require(invoice.id == _id && invoice.amount > 0, "This invoice is invalid");

    //     require(msg.sender == invoice.payer, "Only the payer can mark the invoice as late");
    //     require(keccak256(abi.encodePacked(invoice.status)) == keccak256(abi.encodePacked("Active"))
    //     ||
    //     keccak256(abi.encodePacked(invoice.status)) == keccak256(abi.encodePacked("Overdue")),
    //     "Invoice already marked as paid or late");

    //     // invoice.status = Status.LATE;
    //     invoice.status = "Late";
    //     creditScores[invoice.payer].lateTokens++;
    // }

    // /**TODO
    // add tests */
    // function markAsOverdue(uint _id) public {
    //     require(block.timestamp > invoices[_id].dueDate, "The due date has not passed");
    //     Invoice storage invoice = invoices[_id];
    //     require(msg.sender == invoice.payer, "Only the payer can mark the invoice as overdue");
    //     // invoice.status = Status.OVERDUE;
    //     invoice.status = "Overdue";
    //     creditScores[invoice.payer].overdueTokens++;
    // }

    /**TODO
    add tests
    should it be removed*/
    function cancelInvoice(uint _id) public {
        require(invoices[_id].id == 0, "This invoice does not exist");
        require(invoices[_id].paymentStatus != PaymentStatus.PAID, "This invoice cannot be removed as it was already paid");

        //an invoice can only be cancelled if it hasn't been paid
        Invoice storage invoice = invoices[_id];
        require(msg.sender == invoice.invoicer, "Only the invoicer can cancel the invoice");
        delete invoices[_id];
    }
}