import { generateText, streamText } from 'ai';
import { getModifierPromt } from '@/lib/prompt';
import { anthropic } from '@/lib/anthropic';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { modifyDescription, precode } = await req.json();

        const result = await generateText({
            model: anthropic('claude-3-5-sonnet@20240620'),
            prompt: getModifierPromt(precode, modifyDescription),
        });

        const {text}= result;

        const code = text.replace(/```/g, '').replace(/jsx|tsx|ts|js/g, '').replace("asChild", " ")

        console.log("code", code);

        return new Response(JSON.stringify(code), {
            headers: {
                'content-type': 'application/json',
            },
        });
    }
    catch (e) {
        console.error(e);
        return new Response("Error", {
            status: 500,
        });
    }
}