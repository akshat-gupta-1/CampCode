import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    return Response.json({ message: 'Hello' });
  } else {
    return Response.json({ message: 'NO hello' });
  }
}
