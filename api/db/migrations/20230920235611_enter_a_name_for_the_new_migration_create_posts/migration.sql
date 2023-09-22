-- CreateTable
CREATE TABLE "Invoice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" DECIMAL(10, 2) NOT NULL,
    "dueDate" DATE NOT NULL,
    "payerEmail" TEXT NOT NULL,
    "payerPhone" TEXT,
    "currency" TEXT NOT NULL,
    "lateFee" DECIMAL(10, 2),
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
