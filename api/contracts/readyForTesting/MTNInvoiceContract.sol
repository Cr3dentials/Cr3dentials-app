pragma solidity ^0.8.22;

contract InvoiceContract {
    /**TODO
    - change Status from string to enum as seen in the comments
    - create events for activities such as createInvoice etc
    - discuss the difference between late and overdue
     */
    enum PaymentStatus { UNPAID, PAID }
    enum PaymentPhase { PENDING, EARLY, ONTIME, LATE}

    struct Invoice {
        uint id;
        uint dueDate;
        uint amount;
        address payable invoicer;
        address payable payer;
        uint datePaid;
        PaymentStatus paymentStatus;
        PaymentPhase paymentPhase;
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
    mapping(address => bool) public authorizedAddresses;

    constructor(address _platformAddress) {
        require(_platformAddress != address(0), "Platform address cannot be the zero address");
        platformAddress = _platformAddress;
        authorizedAddresses[_platformAddress] = true;
    }

    modifier onlyPlatform() {
        require(msg.sender == platformAddress, "Only platform can call this function");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedAddresses[msg.sender] == true, "Only authorized addresses can call this function");
        _;
    }

    function authorizeAddress(address _address) public onlyPlatform {
        require(_address != address(0), "Address to authorize cannot be the zero address");
        authorizedAddresses[_address] = true;
    }

    function revokeAddress(address _address) public onlyPlatform {
        require(_address != address(0), "Address to revoke cannot be the zero address");
        authorizedAddresses[_address] = false;
    }

    // Events for logging contract activities
    event InvoiceCreated(uint indexed id);
    event PaymentUpdated(uint indexed id, PaymentStatus paymentStatus, PaymentPhase paymentPhase);
    event InvoiceCancelled(uint indexed id);

    /**TODO
    who's calling this function? if it's not always going to be the company then the invoicer should be sent
    how would we deal with amounts given that the invoice would be paid with different real world currency amounts
    does the currency need to be stored*/
    function createInvoice(uint _id, uint _dueDate, uint _amount, address payable _payer) public onlyAuthorized {
        // uint onemonth = 86400 * 30;
        require(invoices[_id].id == 0, "An invoice with this ID has already been created");
        require(_amount > 0, "Invoice amount must be greater than 0");
        // require(_dueDate> (block.timestamp-onemonth), "Date too far in the past");

        invoices[_id] = Invoice(
            _id,
            _dueDate,
            _amount,
            payable(msg.sender),
            _payer,
            0,
            PaymentStatus.UNPAID,
            PaymentPhase.PENDING
        );
    }

    /*
    *TODO
    - do we only upgrade when the total amount is paid?
    - how to handle overdue
    */
    function updateInvoicePaymentInfo(uint _id, uint datePaid) public onlyAuthorized {
        require(datePaid>0, "date paid cannot be zero");
        require(invoices[_id].id != 0, "This invoice does not exist");
        require(invoices[_id].paymentStatus != PaymentStatus.PAID, "This invoice is already marked as paid");
        /**TODO require only the admin(s) of this contract to have the ability to udpate an invoice */

        require(datePaid>86400, "Date too far in the past");
        uint aDay = 86400;
        Invoice memory invoice = invoices[_id];
        PaymentPhase timing;
        if (datePaid> invoices[_id].dueDate){
            timing = PaymentPhase.LATE;
            creditScores[invoice.payer].lateTokens++;
        }else if(datePaid< invoices[_id].dueDate - aDay){
            //if you paid more than 24 hours before the dueDate
            timing = PaymentPhase.EARLY;
            creditScores[invoice.payer].paidEarlyTokens++;
        }else{
            //paid on time is the remaining option
            timing = PaymentPhase.ONTIME;
            creditScores[invoice.payer].paidTokens++;
        }

        /**TODO create a CRON that checks to see if an invoice is overdue and update it either on or offchain */

        invoices[_id].datePaid = datePaid;
        invoices[_id].paymentStatus = PaymentStatus.PAID;
        invoices[_id].paymentPhase = timing;


    }


    /**TODO
    add tests
    should it be removed*/
    function cancelInvoice(uint _id) public onlyAuthorized {
        require(invoices[_id].id != 0, "This invoice does not exist");
        require(invoices[_id].paymentStatus != PaymentStatus.PAID, "This invoice cannot be removed as it was already paid");

        //an invoice can only be cancelled if it hasn't been paid
        Invoice storage invoice = invoices[_id];
        require(msg.sender == invoice.invoicer, "Only the invoicer can cancel the invoice");
        delete invoices[_id];
    }
}