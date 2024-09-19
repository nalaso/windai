'use server';

import { streamText } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';
import { createStreamableValue } from 'ai/rsc';

export async function stream(input: string) {
  const stream = createStreamableValue('');

  (async () => {
    const { textStream } = await streamText({
      model: vertex('gemini-1.5-pro'),
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}