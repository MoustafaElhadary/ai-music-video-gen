/*
  Warnings:

  - You are about to drop the column `videoProps` on the `GenerationRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenerationRequest" DROP COLUMN "videoProps";

-- CreateTable
CREATE TABLE "StripePaymentInfo" (
    "id" TEXT NOT NULL,
    "generationRequestId" TEXT NOT NULL,
    "stripePaymentId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StripePaymentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StripePaymentInfo_generationRequestId_key" ON "StripePaymentInfo"("generationRequestId");

-- AddForeignKey
ALTER TABLE "StripePaymentInfo" ADD CONSTRAINT "StripePaymentInfo_generationRequestId_fkey" FOREIGN KEY ("generationRequestId") REFERENCES "GenerationRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
