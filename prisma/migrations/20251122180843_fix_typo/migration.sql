/*
  Warnings:

  - You are about to drop the column `answer` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "answer",
ADD COLUMN     "answers" TEXT[];
