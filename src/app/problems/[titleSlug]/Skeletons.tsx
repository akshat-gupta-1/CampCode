import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
export const CardSkeleton = () => {
  return (
    <div className="w-[350px] sm:w-[400px]">
      <Card>
        <CardHeader>
          <div>
            <Skeleton className="w-full h-12" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <div>
            <Skeleton className="w-5/6 h-10" />
          </div>
          <div>
            <Skeleton className="w-3/4 h-9" />
          </div>
        </CardContent>
      </Card>
      <div className="my-8 flex justify-end">
        <Skeleton className="w-40 h-10" />
      </div>
    </div>
  );
};
