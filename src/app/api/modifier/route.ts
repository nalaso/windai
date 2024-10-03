import { generateText } from 'ai';
import { getModifierPromt } from '@/lib/prompt';
import { z } from 'zod';
import { llm } from '@/lib/llm';
import { trimCode } from '@/lib/code';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  modifyDescription: z.string().min(1, "Modify description is required"),
  precode: z.string().min(1, "Pre-code is required"),
  modelId: z.string(),
  uiType: z.string(),
});

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();

    const { modifyDescription, precode, modelId, uiType } = inputSchema.parse(body);

    const result = await generateText({
      model: llm(modelId),
      messages: [
        {
          role: "system",
          content: getModifierPromt(precode, modifyDescription, uiType),
        },
        {
          role: "user",
          content: `Now modify React code: ${precode} based on this description: ${modifyDescription}`,
        },
      ],
    });

    const { text } = result;

    //TODO revert 'fixed' to 'absolute' after fixing the bug in iframe
    const code = trimCode(text.replace(/```/g, '').replace(/typescript|javascript|jsx|tsx|ts|js/g, '').replace("asChild"," ").replace("fixed","absolute").trim()); 

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