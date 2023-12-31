'use client';
import { Command, Sparkles, ArrowRight, X, Smile, Sticker } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect, HTMLAttributes } from 'react';
import Image from 'next/image';
import { useChat } from 'ai/react';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrettyCode from 'rehype-pretty-code';
import minLight from 'shikiji/themes/min-light.mjs';
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  CustomDialogContent,
} from '@/components/ui/dialog';
const customUser = {
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="italic text-accentM text-sm"></p>
  ),
};
const customSystem = {
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="text-sand-10 font-inter text-sm"></p>
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code {...props} className="text-accentM"></code>
  ),
};
const AIPrompt = ({ titleSlug }: { titleSlug: string }) => {
  const { input, handleInputChange, handleSubmit, setInput, error, messages } =
    useChat({
      body: { title: titleSlug },
    });
  const buttonVariants = {
    initial: { x: -10, opacity: 0 },
    final: { x: 0, opacity: 1 },
  };
  const [typing, setTyping] = useState<boolean>();
  const [open, setOpen] = useState<boolean>();
  const [text, setText] = useState<string>('');
  const [mdx, setMdx] = useState<
    | {
        mdx: MDXRemoteSerializeResult<
          Record<string, unknown>,
          Record<string, unknown>
        >;
        role: string;
      }[]
    | null
  >(null);
  useEffect(() => {
    if (input.length > 0) {
      setTyping(true);
    } else {
      setTyping(false);
    }
    if (!open) {
      setTyping(false);
    }
  }, [open, input]);
  useEffect(() => {
    const serializeStreamData = async () => {
      const mdxSource = await Promise.all(
        messages.map(async (message) => {
          return {
            mdx: await serialize(message.content, {
              mdxOptions: {
                development: process.env.NODE_ENV === 'development',
                rehypePlugins: [
                  [
                    //@ts-ignore
                    rehypePrettyCode,
                    {
                      keepBackground: false,
                      theme: minLight,
                    },
                  ],
                ],
              },
            }),
            role: message.role,
          };
        })
      );
      console.log(mdxSource);
      setMdx(mdxSource);
    };

    serializeStreamData();
  }, [messages]);
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
          <div className="relative overflow-y-scroll" id="prompt">
            <DialogClose className="absolute right-2 top-0 hover:text-accentM text-sand-9">
              <X className="w-4 h-4" />
            </DialogClose>
            <div>
              {mdx &&
                mdx.map((message, index) => (
                  <div key={index} className="whitespace-pre-wrap my-1">
                    {message.role === 'user' ? (
                      <div className="flex italic text-accentM text-sm">
                        <span>&quot;</span>
                        {
                          <MDXRemote
                            compiledSource={message.mdx.compiledSource}
                            frontmatter={{}}
                            scope={{}}
                            components={customUser}
                          />
                        }
                        &quot;
                      </div>
                    ) : (
                      <MDXRemote
                        compiledSource={message.mdx.compiledSource}
                        frontmatter={{}}
                        scope={{}}
                        components={customSystem}
                      />
                    )}
                  </div>
                ))}
              {messages.length === 0 && (
                <div className="text-sm text-sand-8 font-medium flex flex-col gap-y-4">
                  <span className="flex items-center text-base">
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
              )}
            </div>
          </div>
          <form className="flex gap-x-2 items-center" onSubmit={handleSubmit}>
            <Sparkles className="mr-2 text-accentM" />
            <input
              className="w-full outline-none font-inter placeholder:text-sand-8 text-sand-11 bg-backgroundM"
              placeholder="Ask me anything about the problem..."
              value={input}
              onChange={handleInputChange}
            ></input>
            <motion.button
              className="p-1 bg-orange-3 rounded-lg text-accentM hover:bg-accentM hover:text-white"
              variants={buttonVariants}
              type="submit"
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
          </form>
        </CustomDialogContent>
      </Dialog>
    </>
  );
};

export default AIPrompt;
