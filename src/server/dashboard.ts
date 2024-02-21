import { router, protectedProcedure } from "./trpc";
import { z } from "zod";
import { db } from "@/lib/db";
import { request, gql } from "graphql-request";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

const endpoint = "https://leetcode.com/graphql/";
interface SuggestedProblem {
  activeDailyCodingChallengeQuestion: {
    question: {
      title: string;
      titleSlug: string;
      frontendQuestionId: string;
      difficulty: "Easy" | "Medium" | "Hard";
      topicTags: {
        name: string;
        slug: string;
      }[];
    };
  };
}
export const dashboardData = router({
  basicData: protectedProcedure.query(async (req) => {
    const problemCount = await db.problem.count({
      where: { userId: req.ctx.session.user.id },
    });
    const topicCount: { count: bigint }[] = await db.$queryRaw(
      Prisma.sql`SELECT COUNT(DISTINCT t.name ) FROM "Problem" p JOIN "_ProblemToTag" pt ON p.id = pt."A" JOIN "Tag" t ON pt."B"= t.id WHERE p."userId" = ${req.ctx.session.user.id};`,
    );
    const totalTimeSpent: { sum: bigint }[] = await db.$queryRaw(
      Prisma.sql`SELECT SUM(s."timeTaken") FROM "Problem" p JOIN "Solved" s ON p.id=s."problemId" where p."userId" = ${req.ctx.session.user.id};`,
    );
    return {
      problemCount,
      topicCount: Number(topicCount[0].count) || 0,
      totalTimeSpent: totalTimeSpent[0].sum
        ? (Number(totalTimeSpent[0].sum!) / 1000 / 60 / 60).toFixed(2)
        : 0,
    };
  }),
  activityCalender: protectedProcedure.query(async (req) => {
    const result: { dateSolved: Date; count: number }[] = await db.$queryRaw(
      Prisma.sql`SELECT CAST(s."dateSolved" as DATE) , COUNT(*) FROM "Problem" p JOIN "Solved" s ON p.id=s."problemId" where p."userId" = ${req.ctx.session.user.id}  GROUP BY CAST(s."dateSolved" as DATE);`,
    );
    const data = result.map((item) => {
      const countData = Number(item.count);
      const date = format(item.dateSolved, "yyyy-MM-dd");
      return {
        date: date,
        count: countData,
        level:
          countData > 5
            ? 4
            : countData > 3
              ? 3
              : countData > 2
                ? 2
                : countData === 1
                  ? 1
                  : 0,
      };
    });
    data.unshift({
      date: "2024-01-01",
      count: 0,
      level: 0,
    });
    data.push({
      count: 0,
      date: "2024-12-31",
      level: 0,
    });
    return data;
  }),
  barChartData: protectedProcedure.query(async (req) => {
    const result = await db.problem.groupBy({
      where: {
        userId: req.ctx.session.user.id,
      },
      by: ["difficulty"],
      _count: {
        difficulty: true,
      },
    });
    return result;
  }),
  suggestedProblem: protectedProcedure.query(async () => {
    const document = gql`
      query questionOfToday {
        activeDailyCodingChallengeQuestion {
          question {
            title
            titleSlug
            frontendQuestionId: questionFrontendId
            difficulty
            topicTags {
              name
              slug
            }
          }
        }
      }
    `;
    const data = await request<SuggestedProblem>(endpoint, document, {});
    return data.activeDailyCodingChallengeQuestion.question;
  }),
  donutChartData: protectedProcedure.query(async (req) => {
    const result: { count: bigint; name: string }[] = await db.$queryRaw(
      Prisma.sql`SELECT COUNT(DISTINCT p.id),t.name FROM "Problem" p join "_ProblemToTag" pt on p.id= pt."A" join "Tag" t on pt."B"= t.id where p."userId" = ${req.ctx.session.user.id} GROUP BY t.name;`,
    );
    const data = result.map((item) => {
      const tag = item.name
        .replace(/-/g, " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

      return { name: tag, problems: Number(item.count) };
    });
    return data;
  }),
  lineChartData: protectedProcedure.query(async (req) => {
    const result: { dateSolved: Date; sum: number }[] = await db.$queryRaw(
      Prisma.sql`SELECT CAST(s."dateSolved" as DATE),SUM(s."timeTaken") FROM "Solved" s JOIN "Problem" p ON p.id=s."problemId" where p."userId"= ${req.ctx.session.user.id} GROUP BY CAST( s."dateSolved" as DATE);`,
    );
    const data = result.map((item) => {
      return {
        day: format(item.dateSolved, "MM/dd"),
        "Time Taken": (Number(item.sum) / 1000) / 60,
      };
    });
    return data;
  }),
});
