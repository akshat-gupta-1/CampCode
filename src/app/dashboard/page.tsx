'use client';
import { useSession } from 'next-auth/react';
const Page = () => {
  const { data: session } = useSession();
  return <div>Hello dashboard {JSON.stringify(session)}</div>;
};

export default Page;
