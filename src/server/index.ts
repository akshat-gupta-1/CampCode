import { publicProcedure, router, protectedProcedure } from './trpc';
import { authRouter } from './auth';
import { problemRouter } from './problems';
export const appRouter = router({
  getTodos: protectedProcedure.query(async () => {
    return [10, 20, 30];
  }),
  auth: authRouter,
  problems: problemRouter,
});

export type AppRouter = typeof appRouter;
