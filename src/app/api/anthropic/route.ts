import { anthropic } from '@/lib/anthropic';
import { getGenerationPrompt } from '@/lib/prompt';
import { generateText } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  codeDescription: z.string().min(1, "Code description is required"),
});

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { codeDescription } = inputSchema.parse(body);

    const result = await generateText({
      model: anthropic('claude-3-5-sonnet@20240620'),
      prompt: getGenerationPrompt(codeDescription),
    });

    const { text } = result;
    const code = text.replace(/```/g, '').replace(/jsx|tsx|ts|js/g, '').replace("asChild"," ").replace("fixed","absolute");

    return new Response(JSON.stringify(code), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in anthropic API route:', error);
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