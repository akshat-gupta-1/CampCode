import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server';
import { getServerAuthSession } from '@/server/authSession';
import { inferAsyncReturnType } from '@trpc/server';
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await getServerAuthSession();
  return {
    session,
  };
};
export type context = inferAsyncReturnType<typeof createContext>;
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });
export { handler as GET, handler as POST };
