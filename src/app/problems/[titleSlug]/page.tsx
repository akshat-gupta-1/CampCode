'use client';
import { useRef, useState } from 'react';
import DataCard from './DataCard';
import CountDown from './CountDown';
const Page = ({ params }: { params: { titleSlug: string } }) => {
  const [timer, setTimer] = useState<number>(40 * 60 * 1000);
  const [time, setTime] = useState<number>(timer);
  const timerRef = useRef<NodeJS.Timeout>();
  const [running, setRunning] = useState<boolean>(false);
  return (
    <div className="lg:my-32 sm:my-16 my-10 grid lg:grid-cols-[minmax(500px,_1fr)_minmax(200px,_400px)] grid-cols-1 font-inter sm:gap-y-20 gap-y-14">
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
      <div className="justify-self-center">
        <DataCard
          title={params.titleSlug}
          timer={timer}
          time={time}
          setRunning={setRunning}
          timerRef={timerRef}
        />
      </div>
    </div>
  );
};

export default Page;
