/*
  Warnings:

  - You are about to alter the column `timeTaken` on the `Solved` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Solved" ALTER COLUMN "timeTaken" SET DATA TYPE INTEGER;
