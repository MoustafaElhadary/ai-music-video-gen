/*
  Warnings:

  - You are about to drop the column `userId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `songs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Book_name_idx";

-- DropIndex
DROP INDEX "Book_userId_idx";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "userId";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "songs";

-- DropTable
DROP TABLE "subscriptions";
