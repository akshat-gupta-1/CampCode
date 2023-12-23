'use client';
import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowLeft, Search, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    sortingFns: {
      difficulty: (rowA: any, rowB: any, columnId: any): number => {
        type difficultyType = 'Easy' | 'Medium' | 'Hard';
        const difficultyOrder: Record<difficultyType, number> = {
          Easy: 0,
          Medium: 1,
          Hard: 2,
        };

        const valueA: difficultyType = rowA.getValue(columnId);
        const valueB: difficultyType = rowB.getValue(columnId);

        const difficultyA = difficultyOrder[valueA];
        const difficultyB = difficultyOrder[valueB];

        return difficultyA - difficultyB;
      },
    },
  });

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-x-8">
          <div className="flex items-center py-2 mb-4 max-w-sm bg-backgroundM border border-sand-5 rounded-lg px-2 ring-offset-backgroundM focus-within:ring-2 focus-within:ring-primaryM focus-within:ring-offset-2">
            <Search className="w-5 h-5 mr-2 text-sand-9" />
            <input
              placeholder="Search Problem"
              value={
                (table.getColumn('title')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('title')?.setFilterValue(event.target.value)
              }
              className=" placeholder:text-sand-9 outline-none bg-backgroundM w-full text-sm"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-backgroundM border-sand-5 text-sand-9 hover:bg-sand-3 focus-visible:ring-primaryM "
              >
                Columns
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-backgroundM">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize focus:bg-sand-3"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          variant={'customSolid'}
          className="rounded-md"
          onClick={() => router.push('/problems/add-problem')}
        >
          Add Problem
        </Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn('text-sand-9', {
                      'w-[400px]': header.id === 'tags',
                      'w-[350px]': header.id === 'title',
                      'w-[100px]': header.id === 'difficulty',
                    })}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="disabled:bg-backgroundM bg-backgroundM disabled:opacity-100 disabled:text-sand-10 text-accentM hover:bg-sand-3 hover:text-orange-10 border border-sand-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          size="sm"
          onClick={() => table.nextPage()}
          className="disabled:bg-backgroundM bg-backgroundM disabled:opacity-100 disabled:text-sand-10 text-accentM hover:bg-sand-3 hover:text-orange-10 border border-sand-4"
          disabled={!table.getCanNextPage()}
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
