import { FileStack } from 'lucide-react';
import { DataTable } from './data-table';
import { Problem, columns } from './columns';
const page = () => {
  const data: Problem[] = [
    {
      id: '3243',
      title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit',
      tags: [
        'array',
        'hash table',
        'Dynamic Programming',
        'Dynamic Programming',
      ],
      difficulty: 'Easy',
      status: 'Yes',
      practiceDate: 'erjefewaafafafafaf',
    },
  ];
  return (
    <div className="my-12">
      <div className="flex items-center">
        <h2 className="text-3xl font-semibold font-geistSans">Problems</h2>
        <FileStack className="ml-2 w-7 h-7" />
      </div>
      <div>
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default page;
