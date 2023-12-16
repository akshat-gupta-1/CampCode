'use client';
import Image from 'next/image';
import { Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';
import { SvgSpinnersBarsRotateFade } from '@/components/Loader';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
const Page = () => {
  const [state, setState] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const refUL = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const query = trpc.problems.allProblems.useQuery(undefined, {
    enabled: false,
  });
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!ref.current?.contains(e.target as Node)) {
        setState(false);
      }
    });
  }, [state]);
  return (
    <div className="max-w-3xl mx-auto my-16 px-8 md:px-0">
      <h3 className="text-2xl font-semibold font-geistSans text-text py-6 border-b border-sand-6 flex gap-x-2">
        <span>Add New Problem</span>
        <Image src={'/svg/add.svg'} width={24} height={24} alt="add svg" />
      </h3>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          const titleSlug = search
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/\(/g, '')
            .replace(/\)/g, '');
          router.push(`${titleSlug}`);
        }}
      >
        <div className="my-10 relative" ref={ref}>
          <div className="wrapper ">
            <div className="animated-border"></div>
            <div className="content flex justify-center items-center">
              <Zap className="text-sand-9 mr-2" />
              <input
                ref={inputRef}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedItem(0);
                  setState(true);
                }}
                value={search}
                className=" w-full focus:outline-none h-full"
                onClick={() => {
                  if (!query.data) {
                    query.refetch();
                  }
                  setState(true);
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === 'ArrowDown' &&
                    query.data &&
                    selectedItem <
                      query.data.data.problemsetQuestionList.questions.length
                  ) {
                    setSelectedItem((prev) => prev + 1);
                  } else if (e.key === 'ArrowUp' && selectedItem > 0) {
                    setSelectedItem((prev) => prev - 1);
                  } else if (e.key === 'Enter' && state) {
                    e.preventDefault();
                    setSearch(
                      refUL.current?.querySelectorAll('li')[selectedItem]
                        .innerText as string
                    );
                    setState(false);
                  } else if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                placeholder="Enter problem title..."
              />
              {query.isFetching && (
                <SvgSpinnersBarsRotateFade height={28} width={28} />
              )}
              {search.length > 0 && query.data && (
                <X
                  className="text-sand-9 cursor-pointer"
                  onClick={() => {
                    setSearch('');
                    inputRef.current?.focus();
                  }}
                />
              )}
            </div>
          </div>
          {state && (
            <div className="absolute md:w-[770px] w-full max-h-[500px] overflow-y-auto bg-orange-1 rounded-xl shadow-sm shadow-orange-3 my-2 scroll-smooth ">
              <ul ref={refUL}>
                {query.data &&
                  query.data.data.problemsetQuestionList.questions
                    .filter((item) =>
                      item.title.toLowerCase().includes(search!.toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        key={index}
                        className={cn(
                          ' p-4 hover:bg-secondaryM cursor-pointer',
                          {
                            'bg-secondaryM': index === selectedItem,
                          }
                        )}
                        onClick={() => {
                          setSearch(item.title);
                          setState(false);
                        }}
                      >
                        {item.title}
                      </li>
                    ))}
              </ul>
              {query.data && refUL.current?.children.length === 0 && (
                <div className="bg-orange-1 p-4 rounded-xl shadow-sm text-accentM">
                  No Problems Found
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-full flex justify-end">
          <Button
            className="bg-accentM shadow-md shadow-secondaryM hover:bg-orange-9 "
            type="submit"
            size={'lg'}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
