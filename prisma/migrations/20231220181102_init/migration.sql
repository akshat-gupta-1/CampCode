-- DropForeignKey
ALTER TABLE "Solved" DROP CONSTRAINT "Solved_problemId_fkey";

-- AlterTable
ALTER TABLE "Solved" ALTER COLUMN "problemId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Solved" ADD CONSTRAINT "Solved_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
