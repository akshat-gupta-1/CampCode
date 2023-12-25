import { router, protectedProcedure } from '@/server/trpc';
import { z } from 'zod';
import { db } from '@/lib/db';

export const dataTableRouter = router({
  getTags: protectedProcedure.query(async () => {
    const result = await db.tag.findMany();
    const tags = result.map((item) => {
      const tag = item.name
        .replace(/-/g, ' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
      return { label: tag, value: item.name };
    });
    return tags;
  }),
  getProblemData: protectedProcedure.query(async () => {
    const result = await db.problem.findMany({
      include: { Solved: true, tags: true },
    });
    const data = result.map((item) => {
      return {
        id: item.id,
        frontendId: item.number,
        title: item.title,
        tags: item.tags.map((item) => item.name),
        difficulty: item.difficulty,
        status: item.Solved.map((item) => item.Completed),
        practiceDate: item.Solved.map((item) => item.dateSolved.toUTCString()),
      };
    });
    return data;
  }),
  deleteProblem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (req) => {
      await db.problem.delete({ where: { id: req.input.id } });
    }),
});
