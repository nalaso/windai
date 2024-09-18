import { llm } from '@/lib/llm';
import { getBalancedPrompt, getCreativePrompt } from '@/lib/prompt';
import { generateText } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  codeCommand: z.string().min(1, "Code command is required"),
  type: z.enum(["creative", "balanced"], {
    errorMap: () => ({ message: "Type must be either 'creative' or 'balanced'" })
  }),
  modelId: z.string(),
});

const generateContent = (prompt: string, type: string) => {
  if (type === "creative") {
    return getCreativePrompt(prompt);
  } else {
    return getBalancedPrompt(prompt);
  }
};

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    
    const { codeCommand, type, modelId } = inputSchema.parse(body);

    const result = await generateText({
      model: llm(modelId),
      prompt: generateContent(codeCommand, type),
    });

    const { text } = result;

    return new Response(JSON.stringify(text), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in page_description API route:', error);
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