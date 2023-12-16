'use client';
import { trpc } from '@/app/_trpc/client';
import { Tags, BookText, CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CardSkeleton } from './Skeletons';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
const DataCard = ({ title }: { title: string }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const query = trpc.problems.getSpecificProblem.useQuery(title);
  if (query.data) {
    return (
      <div>
        <Card className="bg-backgroundM">
          <CardHeader>
            <CardTitle className="text-xl">
              {query.data.data.question.questionFrontendId}.{' '}
              {query.data.data.question.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <div className="grid grid-cols-[80px_1fr] gap-x-3">
              <h4 className="flex items-start py-1.5">
                <Tags className="mr-1" />
                Tags :
              </h4>
              <div className="flex flex-col gap-y-3">
                <div className={cn({ 'blur-md': visible === false })}>
                  <div className="flex gap-x-4 flex-wrap gap-y-4">
                    {query.data.data.question.topicTags.map((item) => (
                      <span
                        key={item.slug}
                        className="text-accentM border border-accentM p-1.5 text-sm rounded-md bg-orange-2 font-medium"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="text-xs text-sand-8 hover:underline hover:text-sand-10"
                    onClick={() => {
                      setVisible((prev) => !prev);
                    }}
                  >
                    {visible ? 'Unshow' : 'Show'}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-x-3">
              <h4 className="flex py-1.5">
                <BookText className="mr-1" />
                Difficulty :
              </h4>
              <span
                className={cn('p-1.5 font-medium border rounded-md', {
                  'text-green-700 border-green-700 bg-green-100/50':
                    query.data.data.question.difficulty.toLowerCase() ===
                    'easy',
                  'text-yellow-500 border-yellow-500 bg-yellow-100/50':
                    query.data.data.question.difficulty.toLowerCase() ===
                    'medium',
                  'text-red-500 border-red-500 bg-red-100/50':
                    query.data.data.question.difficulty.toLowerCase() ===
                    'hard',
                })}
              >
                {query.data.data.question.difficulty}
              </span>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button className="my-10 text-accentM border border-accentM bg-backgroundM hover:bg-accentM hover:text-white">
            <CheckCircle className="w-4 h-4 mr-2" />
            Completed
          </Button>
        </div>
      </div>
    );
  }else{
    return <CardSkeleton />
  }
};

export default DataCard;