"use client";
import { LayoutDashboard, Layers, Hourglass, Tags } from "lucide-react";
import { trpc } from "../_trpc/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TabComponent from "./_components/TabComponent";
import Charts from "./_components/Charts";
const Page = () => {
  const { data: basicData } = trpc.dashboard.basicData.useQuery();
  return (
    <div className="my-12">
      <h2 className="text-3xl font-semibold flex items-center">
        Dashboard{" "}
        <LayoutDashboard className="ml-2 text-accentM fill-primaryM" />
      </h2>
      <div className="my-6 grid md:grid-cols-3 gap-x-6 gap-y-4 grid-cols-1">
        <Card className="bg-backgroundM text-text border-sand-5">
          {basicData ? (
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="flex items-center text-sand-9 font-medium">
                    Total Problems Solved
                  </span>
                  <span className="font-lato font-semibold text-lg">
                    {basicData.problemCount}
                  </span>
                </div>
                <Layers className="w-6 h-6 ml-2 text-sand-9" />
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex flex-col py-4 gap-y-2">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-1/2 h-5" />
            </CardContent>
          )}
        </Card>
        <Card className="bg-backgroundM text-text border-sand-5">
          {basicData ? (
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="flex items-center text-sand-9 font-medium">
                    Total Hours Spent
                  </span>
                  <span className="font-lato font-semibold text-lg">
                    {basicData.totalTimeSpent}
                  </span>
                </div>
                <Hourglass className="w-6 h-6 ml-2 text-sand-9" />
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex flex-col py-4 gap-y-2">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-1/2 h-5" />
            </CardContent>
          )}
        </Card>
        <Card className="bg-backgroundM text-text border-sand-5">
          {basicData ? (
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="flex items-center text-sand-9 font-medium">
                    Total Topics Covered
                  </span>
                  <span className="font-lato font-semibold text-lg">
                    {basicData.topicCount}
                  </span>
                </div>
                <Tags className="w-6 h-6 ml-2 text-sand-9" />
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex flex-col py-4 gap-y-2">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-1/2 h-5" />
            </CardContent>
          )}
        </Card>
      </div>
      <TabComponent />
      <Charts />
    </div>
  );
};

export default Page;
