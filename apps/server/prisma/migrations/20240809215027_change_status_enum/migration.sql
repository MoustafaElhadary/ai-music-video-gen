/*
  Warnings:

  - The values [SUBMITTED] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RequestStatus_new" AS ENUM ('STARTED', 'FILLED', 'PAID', 'PROCESSING', 'COMPLETED', 'FAILED');
ALTER TABLE "GenerationRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "GenerationRequest" ALTER COLUMN "status" TYPE "RequestStatus_new" USING ("status"::text::"RequestStatus_new");
ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "RequestStatus_old";
ALTER TABLE "GenerationRequest" ALTER COLUMN "status" SET DEFAULT 'STARTED';
COMMIT;

-- AlterTable
ALTER TABLE "GenerationRequest" ALTER COLUMN "status" SET DEFAULT 'STARTED';
