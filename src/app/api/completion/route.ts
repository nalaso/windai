import { streamText } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await streamText({
    model: vertex('gemini-1.5-pro'),
    prompt,
  });

  return result.toDataStreamResponse();
}
