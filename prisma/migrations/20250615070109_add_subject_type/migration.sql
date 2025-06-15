-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('CORE', 'ELECTIVE');

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "subjectType" "SubjectType" NOT NULL DEFAULT 'CORE';
