"use client";
import { trpc } from "@/app/_trpc/client";
import { Tags, BookText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardSkeleton } from "./Skeletons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
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
import AIPrompt from "./AIPrompt";
const DataCard = ({
  title,
  timer,
  time,
  setRunning,
  timerRef,
}: {
  title: string;
  timer: number;
  time: number;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  timerRef: React.MutableRefObject<NodeJS.Timeout | undefined>;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const revisionParam = searchParams.get("revision");
  const idParam = searchParams.get("id");
  const revisionBool = revisionParam === "true" ? true : false;
  const utils = trpc.useUtils();
  const query = trpc.problems.getSpecificProblem.useQuery(title);
  const mutation = trpc.problems.saveProblem.useMutation({
    onSuccess() {
      utils.problems.invalidate();
      utils.problems.dataTable.invalidate();
    },
  });
  const revisionMutation = trpc.revision.addProblem.useMutation({
    onSuccess() {
      utils.revision.invalidate();
    },
  });
  const handleAdd = (revisionBool: boolean) => {
    if (query.data) {
      const date = new Date();
      const result = mutation.mutateAsync({
        title: query.data.data.question.titleSlug,
        difficulty: query.data.data.question.difficulty,
        frontendId: Number(query.data.data.question.questionFrontendId),
        tags: query.data.data.question.topicTags.map((item) => item.slug),
        date: date.toUTCString(),
        timeTaken: timer - time,
      });
      if (revisionBool) {
        if (idParam) {
          const res = revisionMutation.mutateAsync({
            problemId: idParam,
          });
          const allPromises = Promise.all([result, res]);
          toast.promise(allPromises, {
            loading: "Saving Revised Problem",
            success: (data) => {
              return `Successfully Revised Problem`;
            },
            error: "Error",
          });
          allPromises.then((value) => {
            router.push("/revision");
          });
        }
      } else {
        toast.promise(result, {
          loading: "Saving Problem",
          success: (data) => {
            return `Successfully Saved Problem`;
          },
          error: "Error",
        });
        result.then((value) => {
          router.push("/problems");
        });
      }
    }
  };
  if (query.data) {
    return (
      <div className="sm:w-[400px] w-[350px] ">
        <Card className="bg-backgroundM">
          <CardHeader>
            <CardTitle className="text-xl">
              {query.data.data.question.questionFrontendId}.{" "}
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
                <div className={cn({ "blur-md": visible === false })}>
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
                    {visible ? "Unshow" : "Show"}
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
                className={cn("p-1.5 font-medium border rounded-md", {
                  "text-green-700 border-green-700 bg-green-100/50":
                    query.data.data.question.difficulty.toLowerCase() ===
                    "easy",
                  "text-yellow-500 border-yellow-500 bg-yellow-100/50":
                    query.data.data.question.difficulty.toLowerCase() ===
                    "medium",
                  "text-red-500 border-red-500 bg-red-100/50":
                    query.data.data.question.difficulty.toLowerCase() ===
                    "hard",
                })}
              >
                {query.data.data.question.difficulty}
              </span>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-x-4">
          <AIPrompt titleSlug={title} />
          <AlertDialog>
            <AlertDialogTrigger
              className="flex items-center px-4 py-2 rounded-md my-10 text-accentM border border-accentM bg-backgroundM hover:bg-accentM hover:text-white font-medium"
              onClick={() => {
                clearInterval(timerRef.current);
                setRunning(false);
              }}
            >
              {" "}
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-text">
                  Did you completely solved the problem?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sand-10">
                  You spent {Math.floor((timer - time) / 1000 / 60)} minutes to
                  solve the problem.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-sand-10 hover:bg-sand-2 hover:text-sand-11 px-8">
                  No
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-accentM hover:bg-orange-9 px-8"
                  onClick={() => handleAdd(revisionBool)}
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    );
  } else {
    return <CardSkeleton />;
  }
};

export default DataCard;
