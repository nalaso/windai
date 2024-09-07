import { anthropic } from '@/lib/anthropic';
import { generateText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(req: Request): Promise<Response> {
  try {
    const ideas: string[] = [];

    await generateText({
      model: anthropic('claude-3-5-sonnet@20240620'),
      tools: {
        appIdea: tool({
          description: 'Generate an array of 5 app ideas for a web or mobile application or specific functionality within an app',
          parameters: z.object({
            suggestions: z.array(z.string().describe('A list of app ideas')),
          }),
          execute: async ({ suggestions }: { suggestions: string[] }) => {
            // Example implementation: push suggestions into ideas array
            suggestions.forEach((suggestion) => ideas.push(suggestion));
            return { suggestions };
          },
        }),
      },
      toolChoice: 'required',
      prompt: `Generate 5 unique prompts for creating innovative UI components for a web or mobile application. Each prompt should encourage creativity and offer specific design or functional requirements.Each prompt should not be more thatn 60 characters. Generate alternatives for these - 
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
    console.error('Error in anthropic API route:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
