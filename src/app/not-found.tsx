import React from 'react';
import { Ghost, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const NotFoundPage = () => {
  return (
    <div className="h-[500px] flex justify-center items-center flex-col gap-y-6">
      <Ghost className="w-[120px] h-[120px]" strokeWidth={1.5} />
      <div className=" flex flex-col items-center">
        <div className="text-accentM font-semibold text-7xl">404</div>{' '}
        <div className="text-lg font-medium">Not Found</div>
      </div>
      <div>
        <Link href={'/dashboard'}>
          <Button className="bg-accentM rounded-full hover:bg-orange-9">
            Go back to homepage <ArrowLeft className="w-5 h-5 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
