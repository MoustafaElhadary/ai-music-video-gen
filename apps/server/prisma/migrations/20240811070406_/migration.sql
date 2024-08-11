-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RequestStatus" ADD VALUE 'AUDIO_PROCESSED';
ALTER TYPE "RequestStatus" ADD VALUE 'SUBTITLE_PROCESSED';
ALTER TYPE "RequestStatus" ADD VALUE 'SUBTITLE_FAILED';
ALTER TYPE "RequestStatus" ADD VALUE 'IMAGE_PROCESSED';
ALTER TYPE "RequestStatus" ADD VALUE 'IMAGE_FAILED';
ALTER TYPE "RequestStatus" ADD VALUE 'VIDEO_PROCESSED';
ALTER TYPE "RequestStatus" ADD VALUE 'VIDEO_FAILED';
ALTER TYPE "RequestStatus" ADD VALUE 'UPLOADED';
ALTER TYPE "RequestStatus" ADD VALUE 'UPLOAD_FAILED';
