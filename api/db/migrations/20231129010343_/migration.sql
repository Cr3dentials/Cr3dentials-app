-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Paid', 'Overdue', 'Active', 'Unsigned', 'PaidEarly');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "payerEmail" TEXT,
    "payerPhone" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "lateFee" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PaymentStatus" NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
