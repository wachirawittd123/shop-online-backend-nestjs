-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "notification" BOOLEAN NOT NULL,
    "allNotification" BOOLEAN NOT NULL,
    "method" TEXT,
    "status" TEXT NOT NULL,
    "google" JSONB NOT NULL,
    "facebook" JSONB NOT NULL,
    "provider" TEXT NOT NULL,
    "creditBalance" DOUBLE PRECISION NOT NULL,
    "creditPeriod" TIMESTAMP(3) NOT NULL,
    "consumersId" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "rtoken" TEXT NOT NULL,
    "ftoken" TEXT NOT NULL,
    "gtoken" TEXT NOT NULL,
    "pwExpiredOn" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL,
    "updatedOn" TIMESTAMP(3) NOT NULL,
    "taxName" TEXT NOT NULL,
    "taxNo" TEXT NOT NULL,
    "taxAddress" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "faceCompanyName" TEXT NOT NULL,
    "faceCompanyPassword" TEXT NOT NULL,
    "profile" JSONB NOT NULL,
    "signtoken" JSONB NOT NULL,
    "credit" JSONB NOT NULL,
    "subscription" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "originCreditBalance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verify" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Verify_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditNotification" (
    "id" TEXT NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,
    "lastSent" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "Verify"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditNotification" ADD CONSTRAINT "CreditNotification_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
