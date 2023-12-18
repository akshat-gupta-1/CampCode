'use client';
import { useRef, useState } from 'react';
import DataCard from './DataCard';
import CountDown from './CountDown';
import { trpc } from '@/app/_trpc/client';
const Page = ({ params }: { params: { titleSlug: string } }) => {
  const [timer, setTimer] = useState<number>(40 * 60 * 1000);
  const [time, setTime] = useState<number>(timer);
  const timerRef = useRef<NodeJS.Timeout>();
  const [running, setRunning] = useState<boolean>(false);
  return (
    <div className="my-32 grid grid-cols-[minmax(500px,_1fr)_minmax(200px,_400px)] font-inter">
      <div className="place-self-center">
        <CountDown
          timer={timer}
          setTimer={setTimer}
          time={time}
          setTime={setTime}
          timerRef={timerRef}
          running={running}
          setRunning={setRunning}
        />
      </div>
      <DataCard
        title={params.titleSlug}
        timer={timer}
        time={time}
        setRunning={setRunning}
        timerRef={timerRef}
      />
    </div>
  );
};

export default Page;
