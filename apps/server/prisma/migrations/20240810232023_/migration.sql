/*
  Warnings:

  - You are about to drop the column `audioUrl` on the `GenerationRequest` table. All the data in the column will be lost.
  - You are about to drop the column `lyrics` on the `GenerationRequest` table. All the data in the column will be lost.
  - You are about to drop the column `subtitles` on the `GenerationRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenerationRequest" DROP COLUMN "audioUrl",
DROP COLUMN "lyrics",
DROP COLUMN "subtitles",
ADD COLUMN     "localVideoPath" TEXT,
ADD COLUMN     "srt" TEXT,
ADD COLUMN     "sunoAudioUrl" TEXT,
ADD COLUMN     "sunoLyrics" TEXT;
