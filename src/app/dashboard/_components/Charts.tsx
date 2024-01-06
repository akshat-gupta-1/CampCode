import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BarList, Card as CardTremor } from '@tremor/react';
const Charts = () => {
  const barListData = [
    {
      value: 20,
      name: 'Easy',
    },
    {
      value: 10,
      name: 'Hard',
    },
  ];
  return (
    <div className="grid grid-cols-3 my-8 gap-x-6">
      <Card className="bg-backgroundM border-sand-5">
        <CardContent className="p-4">
          <h5 className="text-sand-9 font-medium">Difficulty</h5>
          <Separator className="my-2 bg-sand-5" />
        </CardContent>
      </Card>
      <Card className="bg-backgroundM border-sand-5">
        <CardContent className="p-4">
          <h5 className="text-sand-9 font-medium">Types of Topics</h5>
          <Separator className="my-2 bg-sand-5" />
        </CardContent>
      </Card>
      <CardTremor></CardTremor>
    </div>
  );
};

export default Charts;
