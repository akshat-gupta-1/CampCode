import { router, protectedProcedure } from '@/server/trpc';
import { z } from 'zod';
import { db } from '@/lib/db';
import { request, gql } from 'graphql-request';
interface allProblems {
  problemsetQuestionList: {
    questions: {
      title: string;
      titleSlug: string;
    }[];
  };
}
interface specificProblem {
  question: {
    questionId: string;
    questionFrontendId: string;
    title: string;
    titleSlug: string;
    difficulty: string;
    topicTags: {
      name: string;
      slug: string;
    }[];
  };
}
const endpoint = 'https://leetcode.com/graphql/';
export const problemRouter = router({
  allProblems: protectedProcedure.query(async () => {
    const document = gql`
      query problemsetQuestionList(
        $categorySlug: String
        $limit: Int
        $skip: Int
        $filters: QuestionListFilterInput
      ) {
        problemsetQuestionList: questionList(
          categorySlug: $categorySlug
          limit: $limit
          skip: $skip
          filters: $filters
        ) {
          questions: data {
            title
            titleSlug
          }
        }
      }
    `;
    const variables = { categorySlug: '', limit: 3000, skip: 0, filters: {} };
    const data = await request<allProblems>(endpoint, document, variables);
    return { data };
  }),
  getSpecificProblem: protectedProcedure
    .input(z.string())
    .query(async (req) => {
      const document = gql`
        query questionTitle($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            questionId
            questionFrontendId
            title
            titleSlug
            difficulty
            topicTags {
              name
              slug
            }
          }
        }
      `;
      const variables = {
        titleSlug: `${req.input}`,
      };
      const data = await request<specificProblem>(
        endpoint,
        document,
        variables
      );
      return { data };
    }),
  saveProblem: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        timeTaken: z.number(),
        date: z.date(),
        frontendId: z.number(),
        difficulty: z.enum(['Easy', 'Medium', 'Hard']),
        tags: z.array(z.string()),
      })
    )
    .mutation(async (req) => {
      const result = await db.problem.create({
        data: {
          title: req.input.title,
          difficulty: req.input.difficulty,
          number: req.input.frontendId,
          Solved: {
            create: {
              dateSolved: req.input.date,
              timeTaken: req.input.timeTaken,
              Completed: 'Yes',
              userId: req.ctx.session.user.id,
            },
          },
        },
      });
      req.input.tags.map(async (item) => {
        const res = await db.tags.findFirst({
          where: { name: { equals: item } },
        });
        if (!res) {
          const result = await db.tags.create({
            data: {
              name: item,
            },
          });
        } 
      });
    }),
});