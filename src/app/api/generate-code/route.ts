import { llm } from '@/lib/llm';
import { getGenerationPrompt } from '@/lib/prompt';
import { generateText } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  codeDescription: z.string().min(1, "Code description is required"),
  modelId: z.string(),
});

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { codeDescription, modelId } = inputSchema.parse(body);

    const result = await generateText({
      model: llm(modelId),
      prompt: getGenerationPrompt(codeDescription),
    });

    const { text } = result;
    //TODO revert 'fixed' to 'absolute' after fixing the bug in iframe
    const code = text.replace(/```/g, '').replace(/jsx|tsx|ts|js/g, '').replace("asChild"," ").replace("fixed","absolute");

    return new Response(JSON.stringify(code), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in API route:', error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Invalid input', details: error.errors }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}