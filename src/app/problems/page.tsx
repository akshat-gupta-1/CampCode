import { FileStack } from 'lucide-react';
import { DataTable } from './data-table';
import { Problem, columns } from './columns';
const page = () => {
  const data: Problem[] = [
    {
      id: '3243',
      title: '2.Lorem, ipsum dolor sit amet consectetur adipisicing elit',
      tags: ['array', 'hash table', 'Dynamic Programming'],
      difficulty: 'Medium',
      status: 'Yes',
      practiceDate: 'erjefewaafafafafaf',
    },
    {
      id: '3243',
      title: '4.Lorem, ipsum dolor sit amet consectetur adipisicing elit',
      tags: ['array', 'hash table', 'Dynamic Programming'],
      difficulty: 'Easy',
      status: 'Yes',
      practiceDate: 'erjefewaafafafafaf',
    },
    {
      id: '3143',
      title: '1.Hello this is akshat',
      tags: ['array', 'hash table', 'Dynamic Programming'],
      difficulty: 'Hard',
      status: 'Yes',
      practiceDate: 'erjefewaafafafafaf',
    },
  ];
  return (
    <div className="my-12 flex flex-col gap-y-8">
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
