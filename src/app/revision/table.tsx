"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Book, File, RotateCw, Tags, ArrowRight, Ghost } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface TableComponentProps {
  problems: Problem[] | undefined;
}
export interface Problem {
  id: string;
  title: string;
  number: number;
  tags: {
    name: string;
  }[];
  difficulty: "Easy" | "Medium" | "Hard";
}
[];
const TableComponent = ({ problems }: TableComponentProps) => {
  const router = useRouter();
  return (
    <Card className="bg-backgroundM border-sand-5 w-full max-w-[1000px]">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[300px] w-[400px]">
                <div className="flex items-center">
                  <File className="mr-1" size={18} />
                  Problem
                </div>
              </TableHead>
              <TableHead className="max-w-[400px] w-[400px]">
                <div className="flex items-center text-left">
                  <Tags className="mr-1" size={18} />
                  Tags
                </div>
              </TableHead>
              <TableHead className="max-w-[200px] w-[400px]">
                <div className="flex items-center">
                  <Book className="mr-1" size={18} />
                  Difficulty
                </div>
              </TableHead>
              <TableHead className="max-w-[150px] w-[400px]">
                <div className="flex items-center">
                  <RotateCw className="mr-1" size={18} />
                  Revise
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems && problems.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center ">
                  <div className="flex justify-center items-center">
                    {" "}
                    <Ghost className="mr-1" />
                    No Results
                  </div>
                </TableCell>
              </TableRow>
            )}
            {problems
              ? problems.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <Link
                          href={`https://leetcode.com/problems/${item.title}`}
                          className="hover:text-accentM"
                        >
                          {" "}
                          {item.number}.{" "}
                          {item.title
                            .replace(/-/g, " ")
                            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                              letter.toUpperCase(),
                            )}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <ul className="flex gap-2 flex-wrap">
                          {item.tags.map((item, index) => {
                            return (
                              <li
                                key={index}
                                className="p-1.5 text-sand-10 bg-sand-3 rounded-md font-medium"
                              >
                                {item.name
                                  .replace(/-/g, " ")
                                  .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                                    letter.toUpperCase(),
                                  )}
                              </li>
                            );
                          })}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <div
                          className={cn(
                            "font-medium p-1.5  w-16 text-center rounded-md",
                            {
                              "text-green-500 bg-green-200":
                                item.difficulty === "Easy",
                              "text-yellow-400 bg-yellow-100":
                                item.difficulty === "Medium",
                              "text-red-500 bg-red-200":
                                item.difficulty === "Hard",
                            },
                          )}
                        >
                          {item.difficulty}
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          className="bg-sand-4 text-sand-9 rounded-full p-1 hover:bg-accentM hover:text-white "
                          onClick={() =>
                            router.push(
                              `/problems/${item.title}?revision=true&id=${item.id}`,
                            )
                          }
                        >
                          <ArrowRight />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              : Array(4)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <TableRow key={index}>
                        {Array(3)
                          .fill(0)
                          .map((_, index) => {
                            return (
                              <TableCell key={index}>
                                <Skeleton className="w-full h-7" />
                              </TableCell>
                            );
                          })}
                        <TableCell>
                          <button
                            className="bg-sand-4 text-sand-9 rounded-full p-1 hover:bg-accentM hover:text-white disabled:bg-sand-3 disabled:text-sand-7"
                            disabled={true}
                          >
                            <ArrowRight />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TableComponent;
