'use client';
import { useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
interface Props {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}
const CountDown = ({ timer, setTimer, time, setTime }: Props) => {
  const timerRef = useRef<NodeJS.Timeout>();
  const [running, setRunning] = useState<boolean>(false);
  const startTimer = () => {
    timerRef.current = setInterval(() => setTime((prev) => prev - 1000), 1000);
    setRunning(true);
  };
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setRunning(false);
  };
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(timer);
    timerRef.current = setInterval(() => setTime((prev) => prev - 1000), 1000);
    setRunning(true);
  };
  const getSeconds = (milliseconds: number) => {
    let seconds = Math.floor(milliseconds / 1000) % 60;
    if (seconds < 10) {
      return `0${seconds}`;
    }
    return seconds;
  };
  const getMinutes = (milliseconds: number) => {
    let minutes = Math.floor(milliseconds / 1000 / 60);
    if (minutes < 10) {
      return `0${minutes}`;
    }
    return minutes;
  };
  const onClickHandler = (time: number) => {
    setTimer(time);
    setTime(time);
    clearInterval(timerRef.current);
  };
  const checkTime = (time: number) => {
    if (time === timer) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  useEffect(() => {
    if (time === 0) {
      clearInterval(timerRef.current);
      setRunning(false);
    }
  }, [time]);
  return (
    <div>
      <div className="font-lato flex gap-x-6">
        <div>
          <span className="text-[140px] px-2">{getMinutes(time)}</span>
          <span className="text-6xl px-2">m</span>
        </div>
        <div>
          <span className="text-[140px] px-2">{getSeconds(time)}</span>
          <span className="text-6xl px-2">s</span>
        </div>
      </div>
      <div className="flex justify-center my-8 gap-x-10">
        {running ? (
          <button
            onClick={stopTimer}
            className="hover:scale-110 hover:transition-all hover:duration-200 hover:ease-in ease-out transition-all duration-200"
          >
            <Pause
              size={36}
              className="h-[60px] w-[60px] p-4 bg-sand-8 fill-white text-white rounded-full"
            />
          </button>
        ) : (
          <button
            onClick={startTimer}
            className="hover:scale-110 hover:transition-all hover:duration-200 hover:ease-in ease-out transition-all duration-200"
          >
            <Play
              size={36}
              className=" h-[60px] w-[60px] p-4 bg-sand-8 fill-white text-white rounded-full"
            />
          </button>
        )}
        <button
          onClick={resetTimer}
          className="hover:scale-110 hover:transition-all hover:duration-200 hover:ease-in ease-out transition-all duration-200"
        >
          <RotateCcw
            size={36}
            className=" h-[60px] w-[60px] p-4 bg-sand-8 text-white rounded-full"
          />
        </button>
      </div>
      <div className="flex gap-x-8 justify-center text-lg">
        <button
          onClick={() => onClickHandler(20 * 60 * 1000)}
          className={cn('px-4 py-1  rounded-full', {
            'bg-accentM text-white': checkTime(20 * 60 * 1000),
          })}
        >
          20
        </button>
        <button
          onClick={() => onClickHandler(40 * 60 * 1000)}
          className={cn('px-4 py-1  rounded-full', {
            'bg-accentM text-white': checkTime(40 * 60 * 1000),
          })}
        >
          40
        </button>
        <button
          onClick={() => onClickHandler(60 * 60 * 1000)}
          className={cn('px-4 py-1  rounded-full', {
            'bg-accentM text-white': checkTime(60 * 60 * 1000),
          })}
        >
          60
        </button>
        <button
          onClick={() => onClickHandler(75 * 60 * 1000)}
          className={cn('px-4 py-1  rounded-full', {
            'bg-accentM text-white': checkTime(75 * 60 * 1000),
          })}
        >
          75
        </button>
        <button
          onClick={() => onClickHandler(90 * 60 * 1000)}
          className={cn('px-4 py-1  rounded-full', {
            'bg-accentM text-white': checkTime(90 * 60 * 1000),
          })}
        >
          90
        </button>
        <button
          onClick={() => onClickHandler(105 * 60 * 1000)}
          className={cn('px-4 py-1  rounded-full', {
            'bg-accentM text-white': checkTime(105 * 60 * 1000),
          })}
        >
          105
        </button>
      </div>
    </div>
  );
};

export default CountDown;
