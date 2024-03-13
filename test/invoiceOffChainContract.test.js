const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("InvoiceContract", function () {
  let InvoiceContract, invoiceContract, owner, addr1, addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    InvoiceContract = await ethers.getContractFactory("InvoiceOffChainContract");
    [owner, addr1, addr2] = await ethers.getSigners();
    console.log(owner.address, addr1.address, addr2.address)

    // Deploy a new contract before each test
    invoiceContract = await InvoiceContract.deploy();
  });


  describe("Transactions", function () {
    it("Should create and fetch an invoice", async function () {
      await invoiceContract.connect(addr1).createInvoice(1, 1710357565, 1000, addr2.address,"USD","PAYPAL");
      const invoice = await invoiceContract.invoices(1);
      expect(invoice.amount).to.equal(1000);
    });

    it("Should allow creating an installment plan", async function () {
      await invoiceContract.connect(addr1).createInvoice(1, 1710357565, 1000, addr2.address,"USD","PAYPAL");
      await invoiceContract.connect(addr1).createInstallmentPlan(1, 4, 1625097600,2);
      const plan = await invoiceContract.installmentPlans(1);
      expect(plan.totalInstallments).to.equal(4);
    });

    it("Should handle installment payments correctly", async function () {
      await invoiceContract.connect(addr1).createInvoice(3, 1625097600, 100, addr2.address, "USD", "Processor");
      await invoiceContract.connect(addr1).createInstallmentPlan(3, 2, 1625097600,2);
      await invoiceContract.connect(addr2).payInstallment(3,50);
      const plan = await invoiceContract.installmentPlans(3);
      expect(plan.installmentsPaid).to.equal(1);
    });

  });
});
