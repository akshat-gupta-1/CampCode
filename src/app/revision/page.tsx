"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { History, ListRestart, AlertOctagon } from "lucide-react";
import TableComponent from "./table";
import { toast } from "sonner";
import { trpc } from "../_trpc/client";
const Page = () => {
  const allRevisionData = trpc.revision.allRevisionProblem.useQuery();
  const utils = trpc.useUtils();
  const resetFn = trpc.revision.reset.useMutation({
    onSuccess() {
      utils.revision.invalidate();
    },
  });
  const recommendation = trpc.revision.recommendationProblem.useQuery();
  return (
    <div className="my-12">
      <h2 className="text-3xl font-inter font-medium flex items-center">
        <span>Revision</span>
        <History className="ml-1" size={26} />
      </h2>
      <p className="text-sm text-sand-10 my-2 ">
        Revise already attempted problems.
      </p>
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center max-w-[1000px]">
          <TabsList className="my-4 w-full max-w-[300px] grid grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Recommendation">Recommendation</TabsTrigger>
          </TabsList>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-orange-100 text-accentM hover:bg-accentM hover:text-white hover:scale-95 ">
                <ListRestart className="mr-1.5" />
                Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to reset?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sand-9">
                  Once resetted it cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-sand-10 hover:bg-sand-2 hover:text-sand-11 px-8">
                  Close
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-accentM text-white hover:bg-orange-9 px-8"
                  onClick={() => {
                    const result = resetFn.mutateAsync();
                    toast.promise(result, {
                      loading: "Resetting",
                      success: (_) => `Successfully Resetted`,
                      error: "Error",
                    });
                  }}
                >
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <TabsContent value="all">
          <TableComponent problems={allRevisionData.data} />
        </TabsContent>
        <TabsContent value="Recommendation">
          <div className="flex  max-w-[1000px] py-4 px-8 bg-sand-3 rounded-md border border-sand-6 text-sand-9 mb-4">
            <div className="w-5 h-5 mr-2">
              <AlertOctagon />
            </div>
            <p>
              Please Note:
              <br />
              For less number of problems it may recommend same problems. Please
              keep that in mind and attempt more problems.
            </p>
          </div>
          <TableComponent problems={recommendation.data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Page;
