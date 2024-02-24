-- DropForeignKey
ALTER TABLE "Revision" DROP CONSTRAINT "Revision_problemId_fkey";

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
