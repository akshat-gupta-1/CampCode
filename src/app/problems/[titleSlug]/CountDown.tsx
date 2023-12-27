'use client';
import { useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import useSound from 'use-sound';
import timer_sound from '../../../../public/audio/timer_sound.mp3';
interface Props {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  timerRef: React.MutableRefObject<NodeJS.Timeout | undefined>;
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}
const CountDown = ({
  timer,
  setTimer,
  time,
  setTime,
  timerRef,
  running,
  setRunning,
}: Props) => {
  const [play] = useSound(timer_sound);
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
  }, [timerRef]);
  useEffect(() => {
    if (time === 0) {
      play();
      clearInterval(timerRef.current);
      setRunning(false);
    }
  }, [time, timerRef, setRunning, play]);
  return (
    <div className="w-[350px] sm:w-full">
      <div className="font-lato flex gap-x-6">
        <div>
          <span className="sm:text-[140px] px-2 text-[90px]">
            {getMinutes(time)}
          </span>
          <span className="sm:text-6xl px-2 text-5xl">m</span>
        </div>
        <div>
          <span className="sm:text-[140px] px-2 text-[90px]">
            {getSeconds(time)}
          </span>
          <span className="sm:text-6xl px-2 text-5xl">s</span>
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
      <div className="flex gap-x-8 justify-center text-lg  flex-wrap gap-y-4">
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
