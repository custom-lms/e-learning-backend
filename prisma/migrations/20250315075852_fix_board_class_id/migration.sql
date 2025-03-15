/*
  Warnings:

  - The primary key for the `Board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Board` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `boardId` on the `Class` table. All the data in the column will be lost.
  - The `id` column on the `Class` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `classId` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `classId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boardId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_classId_fkey";

-- DropIndex
DROP INDEX "Board_name_key";

-- AlterTable
ALTER TABLE "Board" DROP CONSTRAINT "Board_pkey",
ADD COLUMN     "classId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Board_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
DROP COLUMN "boardId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "classId",
ADD COLUMN     "boardId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
