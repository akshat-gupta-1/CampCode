'use client';
import { Suspense, useState } from 'react';
import DataCard from './DataCard';
import CountDown from './CountDown';
const Page = ({ params }: { params: { titleSlug: string } }) => {
  const [timer, setTimer] = useState<number>(40 * 60 * 1000);
  const [time, setTime] = useState<number>(timer);
  return (
    <div className="my-32 grid grid-cols-[minmax(500px,_1fr)_minmax(200px,_400px)] font-inter">
      <div className="place-self-center">
        <CountDown
          timer={timer}
          setTimer={setTimer}
          time={time}
          setTime={setTime}
        />
      </div>
        <DataCard title={params.titleSlug} />
    </div>
  );
};

export default Page;
