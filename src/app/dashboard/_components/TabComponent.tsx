import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CalendarDays, GripHorizontal } from 'lucide-react';
import ActivityCalender from 'react-activity-calendar';
import { Activity, ThemeInput } from 'react-activity-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
interface props extends React.HTMLAttributes<HTMLDivElement> {}
const TabComponent = ({ className, ...props }: props) => {
  const explicitTheme: ThemeInput = {
    light: [
      '#ffefd6',
      'rgba(249, 125, 1,0.4)',
      'rgba(249, 125, 1,0.6)',
      'rgba(249, 125, 1,0.8)',
      'rgba(249, 125, 1,1)',
    ],
  };
  const data: Activity[] = [
    {
      date: '2021-01-01',
      count: 0,
      level: 0,
    },
    {
      date: '2021-04-22',
      count: 16,
      level: 1,
    },
    {
      count: 0,
      date: '2021-12-31',
      level: 0,
    },
  ];
  return (
    <div className={cn(className)} {...props}>
      <Tabs defaultValue="dot-style" className="bg-transparent">
        <TabsList className="grid grid-cols-2 w-[150px]">
          <TabsTrigger value="dot-style">
            <GripHorizontal />
          </TabsTrigger>
          <TabsTrigger value="calender-type">
            <CalendarDays />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dot-style" className="bg-inherit">
          <Card className="bg-backgroundM border-sand-5">
            <CardContent className="p-4 flex flex-col gap-y-4">
              <h5 className="text-sand-9 font-medium">Activity Chart</h5>
              <div className="px-8 flex justify-center">
                <ActivityCalender
                  data={data}
                  colorScheme="light"
                  theme={explicitTheme}
                  labels={{
                    totalCount: `{{count}} Problems Solved in {{year}}`,
                  }}
                  style={{ fontFamily: 'inherit' }}
                  renderBlock={(block, activity) =>
                    React.cloneElement(block, {
                      'data-tooltip-id': 'react-tooltip',
                      'data-tooltip-html': `${activity.count} problems solved on ${activity.date}`,
                    })
                  }
                />
                <ReactTooltip id="react-tooltip" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabComponent;
