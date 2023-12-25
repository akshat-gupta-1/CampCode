-- DropForeignKey
ALTER TABLE "Solved" DROP CONSTRAINT "Solved_problemId_fkey";

-- AddForeignKey
ALTER TABLE "Solved" ADD CONSTRAINT "Solved_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
