import { streamText } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await streamText({
    model: vertex('gemini-1.5-pro'),
    system: 'You are a helpful assistant.',
    prompt,
  });

  return result.toDataStreamResponse();
}