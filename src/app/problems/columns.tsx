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
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
export type Problem = {
  id: string;
  title: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Yes' | 'No';
  practiceDate: string;
};

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
      const status = row.getValue('status');
      if (status === 'Yes') {
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
              {item}
            </span>
          ))}
        </div>
      );
    },
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
    sortingFn: 'datetime',
  },
  {
    id: 'delete',
    cell: ({ row }) => {
      return (
        <button className="text-sand-9 px-2 py-2 hover:bg-sand-3 rounded-lg">
          <Trash2 className="w-5 h-5" />
        </button>
      );
    },
  },
];
