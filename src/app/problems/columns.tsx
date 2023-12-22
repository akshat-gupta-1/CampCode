'use client';
import {
  CircleDot,
  File,
  Tags,
  Book,
  History,
  CheckCircle2,
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
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
    header: () => {
      return (
        <div className="flex items-center">
          <File className="w-4 h-4 mr-1" />
          Problem
        </div>
      );
    },
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
        <div className="flex flex-wrap text-sm gap-y-2">
          {tags.map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-orange-3 text-orange-10 mx-2 rounded-md"
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
    header: () => {
      return (
        <div className="flex items-center">
          <Book className="w-4 h-4 mr-1" />
          Difficulty
        </div>
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
  },
  {
    accessorKey: 'practiceDate',
    header: () => {
      return (
        <div className="flex items-center">
          <History className="w-4 h-4 mr-1" />
          Last Practice
        </div>
      );
    },
  },
];
