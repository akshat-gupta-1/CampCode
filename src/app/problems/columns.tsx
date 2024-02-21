'use client';
import {
  CircleDot,
  File,
  Tags,
  Book,
  History,
  CheckCircle2,
  Trash2,
  ArrowUpDown,
  MoreHorizontal,
  Check,
  FileText,
  X,
} from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import { Textarea } from '@/components/ui/textarea';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { differencFn } from '@/lib/dateDifferenceFn';
import { format } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
enum Difficulty {
  Easy,
  Medium,
  Hard,
}
export type Problem = {
  id: string;
  frontendId: number;
  title: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: ('Yes' | 'No' | null)[];
  practiceDate: string[];
  notes: string | null;
};
import Link from 'next/link';
import { trpc } from '../_trpc/client';
import { toast } from 'sonner';
export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: 'status',
    header: () => {
      return (
        <div className="flex items-center">
          <CircleDot className="w-4 h-4 mr-1" />
          Status
        </div>
      );
    },
    cell: ({ row }) => {
      const status: ('Yes' | 'No')[] = row.getValue('status');
      if (status[status.length - 1] === 'Yes') {
        return <CheckCircle2 className="text-green-500" />;
      }
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className="hover:bg-sand-3 px-2 py-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <File className="w-4 h-4 mr-1" />
          Problem
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue('title');
      const rowData = row.original;
      return (
        <Link
          className="font-medium hover:text-accentM"
          href={`https://leetcode.com/problems/${title}`}
          target="_blank"
        >
          {rowData.frontendId}.{' '}
          {title
            .replace(/-/g, ' ')
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())}
        </Link>
      );
    },
    sortingFn: 'alphanumeric',
  },
  {
    accessorKey: 'tags',
    header: () => {
      return (
        <div className="flex items-center">
          <Tags className="w-4 h-4 mr-1" />
          Tags
        </div>
      );
    },
    cell: ({ row }) => {
      const tags: string[] = row.getValue('tags');
      return (
        <div className="flex flex-wrap text-sm gap-y-1">
          {tags.map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-orange-3 text-orange-10 mx-1 rounded-md"
            >
              {item
                .replace(/-/g, ' ')
                .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                )}
            </span>
          ))}
        </div>
      );
    },
    enableColumnFilter: true,
    filterFn: 'arrIncludes',
  },
  {
    accessorKey: 'difficulty',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className="hover:bg-sand-3 px-2 py-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <Book className="w-4 h-4 mr-1" />
          Difficulty
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const difficulty: 'Easy' | 'Hard' | 'Medium' = row.getValue('difficulty');
      return (
        <div
          className={cn('font-medium', {
            'text-green-500': difficulty === 'Easy',
            'text-yellow-400': difficulty === 'Medium',
            'text-red-500': difficulty === 'Hard',
          })}
        >
          {difficulty}
        </div>
      );
    },
    sortingFn: 'difficulty',
  },
  {
    accessorKey: 'practiceDate',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className="hover:bg-sand-3 px-2 py-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <History className="w-4 h-4 mr-1" />
          Last Practice
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateValue: string[] = row.getValue('practiceDate');
      if (dateValue.length === 1) {
        const date = new Date(dateValue[0]);
        const today = new Date();
        return (
          <div className="font-medium">
            {differencFn(today.toString(), date.toString())}
          </div>
        );
      } else {
        const date = new Date(dateValue[dateValue.length - 1]);
        const today = new Date();
        return (
          <div className="font-medium flex items-center">
            {differencFn(today.toString(), date.toString())}
            <TooltipProvider delayDuration={400}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <MoreHorizontal className="ml-2 w-5 h-5" />
                </TooltipTrigger>
                <TooltipContent
                  data-side="right"
                  side="right"
                  className="flex flex-col gap-y-1"
                >
                  <div>
                    Total Practices:{' '}
                    <span className="text-accentM">{dateValue.length}</span>
                  </div>
                  <ul className="gap-y-1 flex flex-col">
                    {dateValue.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Check
                          className="w-4 h-4 mr-1 text-green-600"
                          strokeWidth={2.5}
                        />
                        {/* @ts-ignore */}
                        {format(item, 'dd-MM-yyyy')}
                      </li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      }
    },
    sortingFn: 'datetime',
  },
  {
    id: 'delete',
    cell: ({ row }) => {
      const problem = row.original;
      const utils = trpc.useUtils();
      const mutation = trpc.problems.dataTable.deleteProblem.useMutation({
        onSuccess() {
          utils.problems.invalidate();
        },
      });
      return (
        <button
          className="text-sand-9 px-2 py-2 hover:bg-sand-3 rounded-lg"
          onClick={() => {
            const result = mutation.mutateAsync({ id: problem.id });
            toast.promise(result, {
              loading: 'Deleting problem',
              success: 'Successfully deleted the problem',
              error: 'Error deleting the problem',
            });
          }}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      );
    },
  },
  {
    id: 'notes',
    cell: ({ row }) => {
      const rowData = row.original;
      const utils = trpc.useUtils();
      const mutation = trpc.problems.dataTable.addNotes.useMutation({
        onSuccess() {
          utils.problems.invalidate();
        },
      });
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <button className="text-sand-9 px-2 py-2 hover:bg-sand-3 rounded-lg">
              <FileText className="w-5 h-5" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="font-inter bg-backgroundM h-[700px]">
            <div className="mx-auto w-full max-w-screen-lg h-full relative">
              <DrawerHeader>
                <DrawerTitle className="underline underline-offset-2 text-3xl decoration-primaryM">
                  Add Notes
                </DrawerTitle>
                <DrawerDescription className="text-sand-9 my-1">
                  Short notes to refrence later.
                </DrawerDescription>
              </DrawerHeader>
              <div className="w-full h-full">
                <Textarea
                  id="notes"
                  defaultValue={rowData.notes ? rowData.notes : ''}
                  placeholder="Write something....."
                  className="focus-within:ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-backgroundM resize-none h-full placeholder:text-sand-9 p-4 text-lg placeholder:text-lg"
                />
              </div>
              <div className="absolute sm:top-4 top-20 right-0 flex gap-x-4 ">
                <button
                  className="text-sand-9 hover:bg-orange-3 rounded-md px-2 py-1 hover:text-accentM text-sm"
                  id="saveButton"
                  onClick={() => {
                    const input = document.getElementById(
                      'notes'
                    ) as HTMLTextAreaElement;
                    if (input.value && input.value) {
                      console.log('hello');
                      const result = mutation.mutateAsync({
                        id: rowData.id,
                        notes: input.value,
                      });
                      toast.promise(result, {
                        loading: 'Saving note..',
                        success: 'Successfully saved!',
                        error: 'Error while saving!',
                      });
                      result.then((value) => {
                        document.getElementById('close')?.click();
                      });
                    }
                  }}
                >
                  Save
                </button>
                <DrawerClose
                  className=" text-sand-9 hover:bg-sand-3 rounded-md px-2 py-1 hover:text-sand-11 text-sm"
                  id="close"
                >
                  Close
                </DrawerClose>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      );
    },
  },
];
