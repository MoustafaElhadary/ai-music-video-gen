-- AlterTable
ALTER TABLE "GenerationRequest" ADD COLUMN     "finalVideoPath" TEXT,
ADD COLUMN     "sunoSongId" TEXT;

-- CreateTable
CREATE TABLE "VideoImage" (
    "id" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,
    "generationRequestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoImage" ADD CONSTRAINT "VideoImage_generationRequestId_fkey" FOREIGN KEY ("generationRequestId") REFERENCES "GenerationRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
