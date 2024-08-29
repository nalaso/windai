import { getGenerationPrompt } from '@/lib/prompt';
import { generateText } from 'ai';
import { createAnthropicVertex } from 'anthropic-vertex-ai';

export async function POST(req: Request): Promise<Response> {
    const  {codeDescription} = await req.json();

    const anthropic = createAnthropicVertex({
        projectId: process.env.Vertex_Ai_ProjectID,
        region: process.env.Vertex_Ai_Location,
        headers: {
            'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15',
        },
    });

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