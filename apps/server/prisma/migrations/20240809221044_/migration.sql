/*
  Warnings:

  - Added the required column `senderName` to the `GenerationRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderPhoneNumber` to the `GenerationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GenerationRequest" ADD COLUMN     "senderName" TEXT NOT NULL,
ADD COLUMN     "senderPhoneNumber" TEXT NOT NULL;
