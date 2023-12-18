/*
  Warnings:

  - You are about to drop the column `problemId` on the `Tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_problemId_fkey";

-- AlterTable
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Solved" ADD CONSTRAINT "Solved_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "problemId",
ADD CONSTRAINT "Tags_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "_ProblemToTags" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProblemToTags_AB_unique" ON "_ProblemToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ProblemToTags_B_index" ON "_ProblemToTags"("B");

-- AddForeignKey
ALTER TABLE "_ProblemToTags" ADD CONSTRAINT "_ProblemToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemToTags" ADD CONSTRAINT "_ProblemToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
