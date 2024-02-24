import { router, protectedProcedure } from "@/server/trpc";
import { z } from "zod";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const dataTableRouter = router({
  getTags: protectedProcedure.query(async (req) => {
    const result: { name: string }[] = await db.$queryRaw(
      Prisma.sql`SELECT DISTINCT t.name FROM "Problem" p JOIN "_ProblemToTag" pt ON p.id = pt."A" JOIN "Tag" t ON pt."B"= t.id WHERE p."userId" = ${req.ctx.session.user.id};`,
    );
    const tags = result.map((item) => {
      const tag = item.name
        .replace(/-/g, " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
      return { label: tag, value: item.name };
    });
    return tags;
  }),
  getProblemData: protectedProcedure.query(async (req) => {
    const result = await db.problem.findMany({
      where: { userId: req.ctx.session.user.id },
      include: {
        Solved: true,
        tags: true,
      },
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
        notes: item.notes,
      };
    });
    return data;
  }),
  deleteProblem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (req) => {
      await db.problem.delete({
        where: { id: req.input.id, userId: req.ctx.session.user.id },
      });
    }),
  addNotes: protectedProcedure
    .input(z.object({ id: z.string(), notes: z.string() }))
    .mutation(async (req) => {
      await db.problem.update({
        where: { id: req.input.id, userId: req.ctx.session.user.id },
        data: {
          notes: req.input.notes,
        },
      });
    }),
});
