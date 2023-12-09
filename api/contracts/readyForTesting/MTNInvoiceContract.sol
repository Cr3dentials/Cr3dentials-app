pragma solidity ^0.8.22;

contract InvoiceContract {
    /**TODO
    - change Status from string to enum as seen in the comments
    - create events for activities such as createInvoice etc
    - discuss the difference between late and overdue
     */
    // enum Status{ ACTIVE, PAID, PAID_EARLY, LATE, OVERDUE }

    struct Invoice {
        uint id;
        uint dueDate;
        uint amount;
        string status;
        address payable invoicer;
        address payable payer;
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
    check if the ID already exists and decide how to handle duplicates */
    function createInvoice(uint _id, uint _dueDate, uint _amount, address payable _payer) public {
        // invoices[_id] = Invoice(_id, _dueDate, _amount, Status.ACTIVE, payable(msg.sender), _payer);
        require(_amount > 0, "Non-zero invoice amount required");
        invoices[_id] = Invoice(_id, _dueDate, _amount, "Active", payable(msg.sender), _payer);
    }

    function markAsPaid(uint _id) public {
        require(msg.sender == platformAddress, "Only the platform can mark the invoice as paid");

        Invoice storage invoice = invoices[_id];

        require(invoice.id == _id && invoice.amount > 0, "This invoice is invalid");
        require(keccak256(abi.encodePacked(invoice.status)) != keccak256(abi.encodePacked("Paid"))
        &&
        keccak256(abi.encodePacked(invoice.status)) != keccak256(abi.encodePacked("Paid Early")),
        "Invoice already marked as paid");

        // invoice.status = Status.PAID;
        invoice.status = "Paid";
        creditScores[invoice.payer].paidTokens++;
    }

    /** TODO
    - discuss whether the contract should decide whether something was paid early,
    instead of the caller (which may be centralized) */
    function markAsPaidEarly(uint _id) public {
        require(msg.sender == platformAddress, "Only the platform can mark the invoice as paid early");

        Invoice storage invoice = invoices[_id];

        require(invoice.id == _id && invoice.amount > 0, "This invoice is invalid");
        require(keccak256(abi.encodePacked(invoice.status)) != keccak256(abi.encodePacked("Paid"))
        &&
        keccak256(abi.encodePacked(invoice.status)) != keccak256(abi.encodePacked("Paid Early")),
        "Invoice already marked as paid");

        // invoice.status = Status.PAID_EARLY;
        invoice.status = "Paid Early";
        creditScores[invoice.payer].paidEarlyTokens++;
    }

    /** TODO
    - discuss why the payer marks the invoice as late */
    function markAsLate(uint _id) public {
        require(block.timestamp > invoices[_id].dueDate, "The due date has not passed");

        Invoice storage invoice = invoices[_id];

        require(msg.sender == invoice.payer, "Only the payer can mark the invoice as late");
        require(keccak256(abi.encodePacked(invoice.status)) == keccak256(abi.encodePacked("Active"))
        ||
        keccak256(abi.encodePacked(invoice.status)) == keccak256(abi.encodePacked("Overdue")),
        "Invoice already marked as paid or late");

        // invoice.status = Status.LATE;
        invoice.status = "Late";
        creditScores[invoice.payer].lateTokens++;
    }

    function markAsOverdue(uint _id) public {
        require(block.timestamp > invoices[_id].dueDate, "The due date has not passed");
        Invoice storage invoice = invoices[_id];
        require(msg.sender == invoice.payer, "Only the payer can mark the invoice as overdue");
        // invoice.status = Status.OVERDUE;
        invoice.status = "Overdue";
        creditScores[invoice.payer].overdueTokens++;
    }

    function cancelInvoice(uint _id) public {
        Invoice storage invoice = invoices[_id];
        require(msg.sender == invoice.invoicer, "Only the invoicer can cancel the invoice");
        delete invoices[_id];
    }
}