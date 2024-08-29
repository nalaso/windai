import { getBalancedPrompt, getCreativePrompt } from '@/lib/prompt';
import { generateText } from 'ai';
import { createAnthropicVertex } from 'anthropic-vertex-ai';

const genrateContent = (prompt:string, type:string) => {
    if (type=="creative") {
        return getCreativePrompt(prompt)
    }else{
        return getBalancedPrompt(prompt)
    }
}

export async function POST(req: Request): Promise<Response> {
    const { codeCommand, type } = await req.json();

    const anthropic = createAnthropicVertex({
        projectId: process.env.Vertex_Ai_ProjectID,
        region: process.env.Vertex_Ai_Location,
        headers: {
            'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15',
        },
    });

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