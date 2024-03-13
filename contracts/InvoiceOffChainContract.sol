pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract InvoiceOffChainContract is Initializable, OwnableUpgradeable{
    /**TODO
    - change Status from string to enum as seen in the comments
    - create events for activities such as createInvoice etc
    - discuss the difference between late and overdue
     */
    enum PaymentStatus { UNPAID, PAID }
    enum PaymentPhase { PENDING, EARLY, ONTIME, LATE}
    enum InstallmentType { WEEKLY, BIWEEKLY, MONTHLY}


    struct InstallmentPlan {
    uint256 totalInstallments;
    uint256 amountPerInstallment;
    uint256 installmentsPaid;
    uint256 nextPaymentDueDate;
    bool isActive;
    InstallmentType installmentType;
    }

    mapping(uint256 => InstallmentPlan) public installmentPlans;


    struct Invoice {
        uint id;
        uint overAllDueDate;
        uint amount;
        address payable invoicer;
        address payable payer;
        uint datePaid;
        PaymentStatus paymentStatus;
        PaymentPhase paymentPhase;
        string currency;
        string paymentProcessor;


    }

    struct CreditScore {
        uint paidTokens;
        uint paidEarlyTokens;
        uint lateTokens;
        uint overdueTokens;
        bool paidInFull;
    }

    mapping(uint => Invoice) public invoices;
    mapping(address => CreditScore) public creditScores;

    address public platformAddress;

    function initialize(address _platformAddress) public initializer {
        __Ownable_init(_platformAddress);
        platformAddress = _platformAddress;
    }

    /**TODO
    who's calling this function? if it's not always going to be the company then the invoicer should be sent
    how would we deal with amounts given that the invoice would be paid with different real world currency amounts
    does the currency need to be stored*/
    function createInvoice(uint _id, uint _dueDate, uint _amount, address payable _payer,string memory curr,string memory processor) public {
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
            PaymentPhase.PENDING,
            curr,
            processor
        );
    }

    /*
    *TODO
    - do we only upgrade when the total amount is paid?
    - how to handle overdue
    */
    function updateInvoicePaymentInfo(uint _id, uint datePaid) public {
        require(datePaid>0, "date paid cannot be zero");
        require(invoices[_id].id != 0, "This invoice does not exist");
        require(invoices[_id].paymentStatus != PaymentStatus.PAID, "This invoice is already marked as paid");
        /**TODO require only the admin(s) of this contract to have the ability to udpate an invoice */

        require(datePaid>86400, "Date too far in the past");
        uint aDay = 86400;
        Invoice memory invoice = invoices[_id];
        PaymentPhase timing;
        if (datePaid> invoices[_id].overAllDueDate){
            timing = PaymentPhase.LATE;
            creditScores[invoice.payer].lateTokens++;
        }else if(datePaid< invoices[_id].overAllDueDate - aDay){
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

function createInstallmentPlan(uint _invoiceId, uint256 _totalInstallments, uint256 _firstPaymentDueDate, InstallmentType _installmentType) public {
    Invoice storage invoice = invoices[_invoiceId];
    require(msg.sender == invoice.invoicer, "Only the invoicer can create an installment plan.");
    require(invoice.paymentStatus == PaymentStatus.UNPAID, "Cannot create installment plan for this invoice status.");
    require(_totalInstallments > 0, "Total installments must be greater than 0.");
    require(!installmentPlans[_invoiceId].isActive, "An installment plan already exists for this invoice.");

    uint256 amountPerInstallment = invoice.amount / _totalInstallments;
    installmentPlans[_invoiceId] = InstallmentPlan({
        totalInstallments: _totalInstallments,
        amountPerInstallment: amountPerInstallment,
        installmentsPaid: 0,
        nextPaymentDueDate: _firstPaymentDueDate,
        isActive: true,
        installmentType: _installmentType
    });
}

function payInstallment(uint _invoiceId,uint value) public  {
    require(installmentPlans[_invoiceId].isActive, "No active installment plan found.");
    InstallmentPlan storage plan = installmentPlans[_invoiceId];
    Invoice storage invoice = invoices[_invoiceId];
    require(msg.sender == invoice.payer, "Only the payer can make a payment.");

    // Check the payment timing and update the credit score accordingly
    uint currentTimestamp = block.timestamp;
    if (currentTimestamp < plan.nextPaymentDueDate) {
        // Early payment
        creditScores[invoice.payer].paidEarlyTokens += 1;
    } else if (currentTimestamp == plan.nextPaymentDueDate) {
        // On-time payment
        creditScores[invoice.payer].paidTokens += 1;
    } else if (currentTimestamp > plan.nextPaymentDueDate && currentTimestamp <= plan.nextPaymentDueDate + 1 days) {
        // Late payment, assuming a 1-day grace period
        creditScores[invoice.payer].lateTokens += 1;
    } else {
        // Overdue payment
        creditScores[invoice.payer].overdueTokens += 1;
    }

    // Assuming value is the payment amount
    require(value == plan.amountPerInstallment, "Payment amount does not match the installment amount.");

    plan.installmentsPaid++;
    if(plan.installmentsPaid == plan.totalInstallments) {
        invoice.paymentStatus = PaymentStatus.PAID; // Mark invoice as paid
        delete installmentPlans[_invoiceId]; // Clean up the installment plan
    } else {
        // Update to next due date based on the installment type
        if(plan.installmentType == InstallmentType.WEEKLY) {
            plan.nextPaymentDueDate += 1 weeks;
        } else if(plan.installmentType == InstallmentType.BIWEEKLY) {
            plan.nextPaymentDueDate += 2 weeks;
        } else if(plan.installmentType == InstallmentType.MONTHLY) {
            plan.nextPaymentDueDate += 30 days; // Approximation for monthly
        }
    }
}



    /**TODO
    add tests
    should it be removed*/
    function cancelInvoice(uint _id) public {
        require(invoices[_id].id != 0, "This invoice does not exist");
        require(invoices[_id].paymentStatus != PaymentStatus.PAID, "This invoice cannot be removed as it was already paid");

        //an invoice can only be cancelled if it hasn't been paid
        Invoice storage invoice = invoices[_id];
        require(msg.sender == invoice.invoicer, "Only the invoicer can cancel the invoice");
        delete invoices[_id];
    }
}