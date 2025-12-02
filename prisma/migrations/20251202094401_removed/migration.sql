/*
  Warnings:

  - Made the column `timeTaken` on table `Leaderboard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Leaderboard" ALTER COLUMN "timeTaken" SET NOT NULL;
