'use client';
import { Command, Sparkles, ArrowRight, X, Smile, Sticker } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  CustomDialogContent,
} from '@/components/ui/dialog';
const AIPrompt = () => {
  const buttonVariants = {
    initial: { x: -10, opacity: 0 },
    final: { x: 0, opacity: 1 },
  };
  const [typing, setTyping] = useState<boolean>();
  const [open, setOpen] = useState<boolean>();
  useEffect(() => {
    if (!open) {
      setTyping(false);
    }
  }, [open]);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex items-center px-4 py-2 rounded-md my-10 text-white bg-accentM hover:bg-orange-9 font-medium">
          <Command className="mr-1 h-4 w-4" />
          Ask AI
        </DialogTrigger>
        <CustomDialogContent
          className="bg-backgroundM p-4 rounded-lg font-inter"
          id="dialog"
        >
          <div className="relative" id="prompt">
            <DialogClose className="absolute right-0 top-0">
              <X className="w-4 h-4" />
            </DialogClose>
            <div className="pt-2 flex flex-col font-medium text-sand-9">
              <span className="flex items-center text-lg">
                Hello User{' '}
                <Image
                  src={'/svg/flower.svg'}
                  width={30}
                  height={30}
                  alt="flower"
                  className="ml-2"
                ></Image>
              </span>{' '}
              <span className="flex">
                Ask Chat-GPT any question regarding the problem.....
              </span>
            </div>
          </div>
          <div className="flex gap-x-2 items-center">
            <Sparkles className="mr-2 text-accentM" />
            <input
              className="w-full outline-none font-inter placeholder:text-sand-8 text-sand-11 bg-backgroundM"
              placeholder="Ask me anything about the problem..."
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setTyping(true);
                } else {
                  setTyping(false);
                }
              }}
            ></input>
            <motion.button
              className="p-1 bg-orange-3 rounded-lg text-accentM hover:bg-accentM hover:text-white"
              variants={buttonVariants}
              initial="initial"
              animate={typing ? 'final' : 'initial'}
              transition={{
                type: 'tween',
                ease: 'easeIn',
                duration: 0.3,
              }}
              disabled={!typing}
            >
              <ArrowRight />
            </motion.button>
          </div>
        </CustomDialogContent>
      </Dialog>
    </>
  );
};

export default AIPrompt;
