import { llm } from '@/lib/llm';
import { getElementProperty, getRefienedElementProperty } from '@/lib/prompt';
import { generateText } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  imageBase64: z.string().min(1, "Image is required"),
  imageModelId: z.string(),
  refine: z.boolean(),
  oldProperties: z.string().optional(),
});

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    
    const { imageModelId, imageBase64, refine, oldProperties } = inputSchema.parse(body);

    const elementProperty = await generateText({
      model: llm(imageModelId),
      messages: [
        {
          role: 'user',
          content: [
            { 
              type: 'text', 
              text: refine?getRefienedElementProperty(oldProperties||""):getElementProperty()
            },
            {
              type: 'image',
              image: imageBase64
            },
          ],
        },
      ],
    });

    const {text: properties} = elementProperty;

    return new Response(JSON.stringify(properties), {
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