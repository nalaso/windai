import { trimCode } from '@/lib/code';
import { llm } from '@/lib/llm';
import { getScreenshotPrompt, getElementProperty, getRefienedElementProperty } from '@/lib/prompt';
import { generateText } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  prompt: z.string().min(1, "Code description is required"),
  imageBase64: z.string().min(1, "Image is required"),
  properties: z.string(),
  modelId: z.string(),
});

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    
    const { prompt, properties, modelId, imageBase64 } = inputSchema.parse(body);
    
    const result = await generateText({
      model: llm(modelId),
      messages: [
        {
          role: 'user',
          content: [
            { 
              type: 'text', 
              text: getScreenshotPrompt(prompt, properties)
            },
            {
              type: 'image',
              image: imageBase64
            },
          ],
        },
      ],
    });

    const { text } = result;
    
    // Clean up the generated code
    const code = trimCode(text.replace(/```/g, '').replace(/typescript|javascript|jsx|tsx|ts|js/g, '').replace("asChild"," ").replace("fixed","absolute").trim()); 

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