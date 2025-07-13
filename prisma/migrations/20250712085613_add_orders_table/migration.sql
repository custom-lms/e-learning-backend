-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('UPI', 'CARD', 'NETBANKING', 'WALLET', 'COD');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "classId" INTEGER NOT NULL,
    "boardId" INTEGER,
    "fullName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "school" TEXT,
    "electiveIds" TEXT[],
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMode" "PaymentMode",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
