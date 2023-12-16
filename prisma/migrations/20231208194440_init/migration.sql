/*
  Warnings:

  - Changed the type of `timeTaken` on the `Solved` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Solved" DROP COLUMN "timeTaken",
ADD COLUMN     "timeTaken" BIGINT NOT NULL;
