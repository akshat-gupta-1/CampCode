'use client';
import { LayoutDashboard, Layers, Hourglass, Tags } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TabComponent from './_components/TabComponent';
import Charts from './_components/Charts';
const Page = () => {
  return (
    <div className="my-12">
      <h2 className="text-3xl font-semibold flex items-center">
        Dashboard{' '}
        <LayoutDashboard className="ml-2 text-accentM fill-primaryM" />
      </h2>
      <div className="my-6 grid grid-cols-3 gap-6">
        <Card className="bg-backgroundM text-text border-sand-5">
          <CardContent className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="flex items-center text-sand-9 font-medium">
                  Total Problems Solved
                </span>
                <span className="font-lato font-semibold text-lg">10</span>
              </div>
              <Layers className="w-6 h-6 ml-2 text-sand-9" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-backgroundM text-text border-sand-5">
          <CardContent className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="flex items-center text-sand-9 font-medium">
                  Total Hours Spent
                </span>
                <span className="font-lato font-semibold text-lg">0.34</span>
              </div>
              <Hourglass className="w-6 h-6 ml-2 text-sand-9" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-backgroundM text-text border-sand-5">
          <CardContent className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="flex items-center text-sand-9 font-medium">
                  Total Topics Covered
                </span>
                <span className="font-lato font-semibold text-lg">6</span>
              </div>
              <Tags className="w-6 h-6 ml-2 text-sand-9" />
            </div>
          </CardContent>
        </Card>
      </div>
      <TabComponent />
      <Charts />
    </div>
  );
};

export default Page;
