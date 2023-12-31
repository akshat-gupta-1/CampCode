import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
interface Messages {
  role: 'system' | 'user';
  content: string;
}
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const data = await req.json();
  const messages: Messages[] = [...data.messages];
  messages.unshift({
    role: 'system',
    content: `Act as a DSA(Data Structure and Algorithms) expert. Provide all code in markdown format(Important).Answer the question based on the leetcode problem with title:${data.title} and link:https://leetcode.com/problems/${data.title}.Provide the response in markdown format.`,
  });
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
