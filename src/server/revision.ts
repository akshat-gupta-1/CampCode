import { Prisma } from "@prisma/client";
import { protectedProcedure } from "./trpc";
import { router } from "./trpc";
import { db } from "@/lib/db";
import { z } from "zod";

export const revisionRouter = router({
  allRevisionProblem: protectedProcedure.query(async (req) => {
    const result = await db.problem.findMany({
      where: {
        userId: req.ctx.session.user.id,
        NOT: {
          Revision: {
            userId: req.ctx.session.user.id,
          },
        },
      },
      select: {
        tags: {
          select: {
            name: true,
          },
        },
        title: true,
        number: true,
        difficulty: true,
        id: true,
      },
    });
    return result;
  }),
  recommendationProblem: protectedProcedure.query(async (req) => {
    const result: {
      array_agg: string[];
      id: string;
      difficulty: "Easy" | "Medium" | "Hard";
      number: number;
      title: string;
    }[] = await db.$queryRaw(
      Prisma.sql`SELECT p.title,p.number,p.id,p.difficulty, ARRAY_AGG(t.name) FROM "Problem" p JOIN "_ProblemToTag" pt ON p.id = pt."A" JOIN "Tag" t ON pt."B"= t.id WHERE p."userId"=${req.ctx.session.user.id} AND NOT EXISTS(SELECT r."problemId" FROM "Revision" r WHERE r."userId"=${req.ctx.session.user.id} AND p.id=r."problemId") GROUP BY p.id ORDER BY random() LIMIT 1;`,
    );
    if (result.length === 0) {
      return [];
    }
    const { array_agg, ...data } = {
      tags: result[0].array_agg.map((item) => {
        return { name: item };
      }),
      ...result[0],
    };
    return [data];
  }),
  reset: protectedProcedure.mutation(async (req) => {
    await db.revision.deleteMany({
      where: {
        userId: req.ctx.session.user.id,
      },
    });
  }),
  addProblem: protectedProcedure
    .input(z.object({ problemId: z.string() }))
    .mutation(async (req) => {
      await db.revision.create({
        data: {
          problemId: req.input.problemId,
          userId: req.ctx.session.user.id,
        },
      });
    }),
});
