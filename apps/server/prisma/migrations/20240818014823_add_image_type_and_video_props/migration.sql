-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('USER_UPLOADED', 'AI_GENERATED');

-- AlterTable
ALTER TABLE "GenerationRequest" ADD COLUMN     "videoProps" JSONB;

-- AlterTable
ALTER TABLE "VideoImage" ADD COLUMN     "imageType" "ImageType" NOT NULL DEFAULT 'AI_GENERATED';
