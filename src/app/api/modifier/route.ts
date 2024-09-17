import { generateText } from 'ai';
import { getModifierPromt } from '@/lib/prompt';
import { z } from 'zod';
import { anthropicModel } from '@/lib/anthropic';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  modifyDescription: z.string().min(1, "Modify description is required"),
  precode: z.string().min(1, "Pre-code is required"),
});

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { modifyDescription, precode } = inputSchema.parse(body);

    const result = await generateText({
      model: anthropicModel('anthropicVertex:claude-3-5-sonnet@20240620'),
      prompt: getModifierPromt(precode, modifyDescription),
    });

    const { text } = result;

    const code = text.replace(/```/g, '').replace(/jsx|tsx|ts|js/g, '').replace("asChild", " ").replace("fixed","absolute");

    return new Response(JSON.stringify(code), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in modifier API route:', error);
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