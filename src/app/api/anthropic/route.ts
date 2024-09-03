import { anthropic } from '@/lib/anthropic';
import { getGenerationPrompt } from '@/lib/prompt';
import { generateText } from 'ai';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: Request): Promise<Response> {
    const  {codeDescription} = await req.json();

    const result = await generateText({
        model: anthropic('claude-3-5-sonnet@20240620'),
        prompt: getGenerationPrompt(codeDescription),
    });

    const {text} = result;
    const code = text.replace(/```/g, '').replace(/jsx|tsx|ts|js/g, '').replace("asChild"," ")

    return new Response(JSON.stringify(code), {
        headers: {
            'content-type': 'application/json',
        },
    });
}