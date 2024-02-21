import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Ghost } from "lucide-react";
import {
  BarList,
  Card as CardTremor,
  DonutChart,
  LineChart,
} from "@tremor/react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
const customTooltip = ({
  payload,
  active,
}: {
  payload: any[];
  active: boolean;
}) => {
  if (!active || !payload) return null;
  const categoryPayload = payload?.[0];
  if (!categoryPayload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-sand-9 bg-backgroundM p-2 shadow-tremor-dropdown border border-sand-5">
      <div className="flex flex-1 space-x-2.5">
        <div
          className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`}
        />
        <div className="w-full">
          <div className="flex items-center justify-between space-x-8">
            <p className="text-left text-tremor-content ">
              {categoryPayload.name}
            </p>
            <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
              {categoryPayload.value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const customTooltipLine = ({
  payload,
  active,
}: {
  payload: any[] | undefined;
  active: boolean | undefined;
}) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-sand-9 bg-backgroundM p-2 shadow-tremor-dropdown border border-sand-5">
      {payload.map((category, idx) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div className={`w-1 flex flex-col bg-${category.color} rounded`} />
          <div className="space-y-1">
            <p className="text-tremor-content">{category.dataKey}</p>
            <p className="font-medium text-tremor-content-emphasis">
              {category.value} minutes
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
const Charts = () => {
  const { data: barData } = trpc.dashboard.barChartData.useQuery();
  const { data: recommendation } = trpc.dashboard.suggestedProblem.useQuery();
  const { data: donutData } = trpc.dashboard.donutChartData.useQuery();
  const { data: lineChartData } = trpc.dashboard.lineChartData.useQuery();
  let barListData;
  if (barData) {
    barListData = barData.map((item) => {
      return {
        value: item._count.difficulty,
        name: String(item.difficulty),
        color:
          item.difficulty === "Easy"
            ? "green"
            : item.difficulty === "Medium"
              ? "yellow"
              : "red",
      };
    });
  }
  const router = useRouter();
  const LineChartData = [
    {
      day: "10/11",
      "Time Taken": 20,
    },
    {
      day: "10/15",
      "Time Taken": 10,
    },
    {
      day: "10/17",
      "Time Taken": 14,
    },
  ];
  return (
    <div>
      <div className="my-8 grid grid-cols-3 gap-x-6">
        <CardTremor className="bg-backgroundM border-sand-5 ring-transparent border p-4 text-sand-11 font-medium">
          <h5 className="text-sand-9 font-medium">Difficulty</h5>
          <Separator className="my-2 bg-sand-5" />
          {barListData ? (
            barListData.length === 0 ? (
              <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="flex text-sand-9 text-sm ">
                  No Problems Attempted.
                </div>
              </div>
            ) : (
              <BarList data={barListData} className="my-4" />
            )
          ) : (
            <>
              <Skeleton className="w-full h-5 py-4 mb-2 mt-4" />
              <Skeleton className="w-3/4 h-5 py-4 my-2" />
              <Skeleton className="w-1/2 h-5 py-4 my-2" />
            </>
          )}
        </CardTremor>
        <Card className="col-span-2 bg-backgroundM border-sand-5 ">
          <CardContent className="p-4">
            <h4 className="text-sand-9 font-medium">Daily Recommendation</h4>
            <Separator className="my-2 bg-sand-5" />
            <Table>
              <TableHeader>
                <TableRow className="border-none border-b-0">
                  <TableHead className="px-2 min-w-[100px] max-w-[100px]">
                    Problem
                  </TableHead>
                  <TableHead className="min-w-[120px] max-w-[120px] px-2">
                    Tags
                  </TableHead>
                  <TableHead className="px-2">Difficulty</TableHead>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="font-medium align-top px-4 py-2">
                    {recommendation ? (
                      `${recommendation.frontendQuestionId}. ${recommendation.title}`
                    ) : (
                      <div className="flex flex-col gap-y-3">
                        {" "}
                        <Skeleton className="w-full h-5" />
                        <Skeleton className="w-1/2 h-5" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {recommendation ? (
                      <ul className="flex gap-x-2 flex-wrap gap-y-1 ">
                        {recommendation.topicTags.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className="text-accentM border-accentM border p-1.5 rounded-md bg-orange-2"
                            >
                              {item.name}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <div className="flex flex-col gap-y-3">
                        {" "}
                        <Skeleton className="w-full h-5" />
                        <Skeleton className="w-1/2 h-5" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="align-top px-4 py-2">
                    {recommendation ? (
                      <span
                        className={cn(
                          "p-1.5 font-medium border rounded-md block text-center",
                          {
                            "text-green-700 border-green-700 bg-green-100/50":
                              recommendation.difficulty === "Easy",
                            "text-yellow-500 border-yellow-500 bg-yellow-100/50":
                              recommendation.difficulty === "Medium",
                            "text-red-500 border-red-500 bg-red-100/50":
                              recommendation.difficulty === "Hard",
                          },
                        )}
                      >
                        {recommendation.difficulty}
                      </span>
                    ) : (
                      <Skeleton className="w-full h-5" />
                    )}
                  </TableCell>
                  <TableCell className="align-top py-2 px-4">
                    <button
                      disabled={recommendation ? false : true}
                      className="hover:bg-accentM hover:text-white rounded-full p-1 text-sand-9 transition-all duration-150 ease-in"
                      onClick={() =>
                        router.push(`/problems/${recommendation?.titleSlug}`)
                      }
                    >
                      <ArrowRight />
                    </button>
                  </TableCell>
                </TableRow>
              </TableHeader>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-3 my-8 gap-x-6">
        <div className="col-span-2">
          <CardTremor className="bg-backgroundM border-sand-5 ring-transparent border p-4 text-sand-11 font-medium">
            <h5 className="text-sand-9 font-medium">Time spent every day</h5>
            {lineChartData ? (
              <LineChart
                data={lineChartData}
                index="day"
                categories={["Time Taken"]}
                customTooltip={customTooltipLine}
                colors={["orange-400"]}
                noDataText="No Data Available"
                connectNulls={true}
              />
            ) : (
              <Skeleton className="w-full h-full my-4 min-h-[300px]" />
            )}
          </CardTremor>
        </div>
        <CardTremor className="bg-backgroundM border-sand-5 ring-transparent border p-4 text-sand-11 font-medium">
          <h5 className="text-sand-9 font-medium">Types of Topics</h5>
          <Separator className="my-2 bg-sand-5" />
          <div className="h-[275px] w-full justify-center items-center">
            {donutData ? (
              <DonutChart
                data={donutData}
                category="problems"
                index="name"
                className="my-4 w-full h-full text-sand-9"
                customTooltip={customTooltip}
                noDataText="No Problems Attempted."
              />
            ) : (
              <Skeleton className="w-full h-full my-4" />
            )}
          </div>
        </CardTremor>
      </div>
    </div>
  );
};

export default Charts;
