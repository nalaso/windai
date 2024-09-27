import { llm } from '@/lib/llm';
import { generateText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(req: Request): Promise<Response> {
  try {    
    const url = new URL(req.url);
    const modelId = url.searchParams.get('modelId')!;
        
    const ideas: string[] = [];

    await generateText({
      model: llm(modelId),
      topP: 1,
      tools: {
        appIdea: tool({
          description: 'Generate an array of 5 app ideas for a web or mobile application or specific functionality within an app',
          parameters: z.object({
            suggestions: z.array(z.string().describe('A list of app ideas')),
          }),
          execute: async ({ suggestions }: { suggestions: string[] }) => {
            suggestions.forEach((suggestion) => ideas.push(suggestion));
            return { suggestions };
          },
        }),
      },
      prompt: `${Math.random() * 10000} Generate 5 very very simple prompts for creating innovative UI components for a web or mobile application. The prompts should only contain UI request and not the functionality. Each prompt should not be more than 60 characters. Simple examples are - 
                [login page for netflix,
                product detail card for sneakers,
                ecommerce checkout page,
                dashboard for sales data,
                Instagram App UI clone].
                Use the tool 'appIdea' to generate ideas for each component.`
    });

    if (ideas.length === 0) {
      return new Response(JSON.stringify({ error: 'No suggestions generated' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(ideas), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in suggestions API route:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
