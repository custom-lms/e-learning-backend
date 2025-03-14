/*
  Warnings:

  - You are about to drop the column `content` on the `Topic` table. All the data in the column will be lost.
  - Added the required column `description` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "content",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL;
