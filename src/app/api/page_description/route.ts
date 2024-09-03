import { anthropic } from '@/lib/anthropic';
import { getBalancedPrompt, getCreativePrompt } from '@/lib/prompt';
import { generateText } from 'ai';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const genrateContent = (prompt:string, type:string) => {
    if (type=="creative") {
        return getCreativePrompt(prompt)
    }else{
        return getBalancedPrompt(prompt)
    }
}

export async function POST(req: Request): Promise<Response> {
    const { codeCommand, type } = await req.json();

    const result = await generateText({
        model: anthropic('claude-3-5-sonnet@20240620'),
        prompt: genrateContent(codeCommand, type)
    });

    const {text} = result;

    return new Response(JSON.stringify(text), {
        headers: {
            'content-type': 'application/json',
        },
    });
}