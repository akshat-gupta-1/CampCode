'use client';
import { FileStack } from 'lucide-react';
import { DataTable } from './data-table';
import { Problem, columns } from './columns';
import { trpc } from '../_trpc/client';
const page = () => {
  const query = trpc.problems.dataTable.getProblemData.useQuery();
  console.log(query.data);
  return (
    <div className="my-12 flex flex-col gap-y-8">
      <div className="flex items-center">
        <h2 className="text-3xl font-semibold font-geistSans">Problems</h2>
        <FileStack className="ml-2 w-7 h-7" />
      </div>
      {query.data && (
        <div>
          <DataTable data={query.data} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default page;
