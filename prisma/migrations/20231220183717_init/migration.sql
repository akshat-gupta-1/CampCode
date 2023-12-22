/*
  Warnings:

  - You are about to drop the column `userId` on the `Solved` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Solved" DROP CONSTRAINT "Solved_userId_fkey";

-- DropIndex
DROP INDEX "Solved_userId_key";

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Solved" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "Problem_userId_key" ON "Problem"("userId");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
