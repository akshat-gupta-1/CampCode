import { TRPCError, initTRPC } from '@trpc/server';
import { context } from '@/app/api/trpc/[trpc]/route';
const t = initTRPC.context<context>().create();

export const router = t.router;
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
