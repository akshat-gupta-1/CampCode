import { publicProcedure, router, protectedProcedure } from "./trpc";
import { authRouter } from "./auth";
import { problemRouter } from "./problems";
import { dashboardData } from "./dashboard";
import { revisionRouter } from "./revision";
export const appRouter = router({
  getTodos: protectedProcedure.query(async () => {
    return [10, 20, 30];
  }),
  auth: authRouter,
  problems: problemRouter,
  dashboard: dashboardData,
  revision: revisionRouter,
});

export type AppRouter = typeof appRouter;
