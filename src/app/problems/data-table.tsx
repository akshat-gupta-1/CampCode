"use client";
import * as React from "react";
import { trpc } from "../_trpc/client";
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
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  Search,
  ChevronDown,
  CheckIcon,
  Ghost,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { compareDesc } from "date-fns";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
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
        type difficultyType = "Easy" | "Medium" | "Hard";
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
      dateSorter: (rowA: any, rowB: any, columnId: any): number => {
        const valueA = rowA.getValue(columnId)[0];
        const valueB = rowB.getValue(columnId)[0];
        return compareDesc(valueA, valueB);
      },
    },
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  });
  const { data: tags } = trpc.problems.dataTable.getTags.useQuery();
  return (
    <div>
      <div className="grid sm:grid-cols-[1fr_200px] grid-cols-1 xl:mb-0 mb-4 gap-y-3">
        <div className="grid xl:grid-cols-[250px_1fr] grid-cols-1 gap-x-2">
          <div className="flex items-center py-2 mb-4 max-w-sm min-w-[250px] bg-backgroundM border border-sand-5 rounded-lg px-2 ring-offset-backgroundM focus-within:ring-2 focus-within:ring-primaryM focus-within:ring-offset-2">
            <Search className="w-5 h-5 mr-2 text-sand-9" />
            <input
              placeholder="Search Problem"
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className=" placeholder:text-sand-9 outline-none bg-backgroundM w-full text-sm"
            />
          </div>
          <div className="flex gap-x-3 md:flex-nowrap flex-wrap gap-y-2">
            <Select
              onValueChange={(value) => {
                table.getColumn("difficulty")?.setFilterValue(value);
              }}
            >
              <SelectTrigger className="bg-backgroundM text-sand-9 font-medium min-w-[160px] max-w-[160px] focus-visible:ring-primaryM hover:bg-sand-3 hover:text-text focus:ring-primaryM">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="font-inter ">
                <SelectItem
                  value="Easy"
                  className="text-green-500 font-medium focus:bg-sand-3 focus:text-green-500"
                >
                  <span className="font-medium">Easy</span>
                </SelectItem>
                <SelectItem
                  value="Medium"
                  className="text-yellow-400 font-medium focus:bg-sand-3 focus:text-yellow-400"
                >
                  <span className="font-medium">Medium</span>
                </SelectItem>
                <SelectItem
                  value="Hard"
                  className="text-red-500 focus:bg-sand-3 focus:text-red-500"
                >
                  <span className="font-medium">Hard</span>
                </SelectItem>
              </SelectContent>
            </Select>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="min-w-[160px] justify-between bg-backgroundM text-sand-9 hover:bg-sand-3 hover:text-text focus-visible:ring-primaryM"
                >
                  {value
                    ? tags?.find((tag) => tag.value === value)?.label
                    : "Select Tag"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command className="bg-backgroundM font-inter">
                  <CommandInput placeholder="Search Tag..." className="h-9" />
                  <CommandEmpty>No tag found.</CommandEmpty>
                  <CommandGroup>
                    {tags?.map((tag) => (
                      <CommandItem
                        key={tag.value}
                        value={tag.value}
                        onSelect={(currentValue) => {
                          table.getColumn("tags")?.setFilterValue(tag.value);
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                        className="aria-selected:bg-sand-3"
                      >
                        {tag.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === tag.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <Select
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
              defaultValue="25"
            >
              <SelectTrigger className="bg-backgroundM text-sand-9 font-medium min-w-[160px] max-w-[160px] focus-visible:ring-primaryM hover:bg-sand-3 hover:text-text focus:ring-primaryM">
                <SelectValue placeholder="Page Size" />
              </SelectTrigger>
              <SelectContent className="font-inter ">
                <SelectItem value="10" className="font-medium focus:bg-sand-3 ">
                  <span className="font-medium">Show 10</span>
                </SelectItem>
                <SelectItem value="25" className=" font-medium focus:bg-sand-3">
                  <span className="font-medium">Show 25</span>
                </SelectItem>
                <SelectItem value="50" className="focus:bg-sand-3">
                  <span className="font-medium">Show 50</span>
                </SelectItem>
                <SelectItem value="100" className="focus:bg-sand-3">
                  <span className="font-medium">Show 100</span>
                </SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="min-w-[160px] max-w-[160px]"
              >
                <Button
                  variant="outline"
                  className="bg-backgroundM border-sand-5 text-sand-9 hover:bg-sand-3 focus-visible:ring-primaryM flex justify-between"
                >
                  Columns
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="bg-backgroundM font-inter w-[160px]"
              >
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
        </div>
        <div className="sm:justify-self-end ">
          <Button
            variant={"customSolid"}
            className="rounded-md"
            onClick={() => router.push("/problems/add-problem")}
          >
            Add Problem
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn("text-sand-9", {
                      "w-[400px]": header.id === "tags",
                      "w-[350px]": header.id === "title",
                      "w-[100px]": header.id === "difficulty",
                    })}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn({
                      "w-[50px] p-2": cell.column.id === "delete",
                      "w-[50px] pr-6 pl-2 py-2": cell.column.id === "notes",
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex justify-center">
                  <Ghost className="w-5 h-5 mr-2" />
                  No results.
                </div>
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
