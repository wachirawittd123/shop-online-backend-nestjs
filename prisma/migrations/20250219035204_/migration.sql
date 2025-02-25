/*
  Warnings:

  - You are about to drop the `CreditNotification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Verify` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CreditNotification" DROP CONSTRAINT "CreditNotification_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_fkey";

-- DropTable
DROP TABLE "CreditNotification";

-- DropTable
DROP TABLE "Verify";

-- CreateTable
CREATE TABLE "UserVerify" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "UserVerify_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCreditNotification" (
    "id" TEXT NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,
    "lastSent" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCreditNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "UserVerify"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCreditNotification" ADD CONSTRAINT "UserCreditNotification_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
