import { getGenerationPrompt } from '@/lib/prompt';
import { generateText } from 'ai';
import { createAnthropicVertex } from 'anthropic-vertex-ai';
import { GoogleAuth } from 'google-auth-library';

export async function POST(req: Request): Promise<Response> {
    const  {codeDescription} = await req.json();

    const googleAuth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/cloud-platform',
        credentials: {
            "private_key": process.env.GOOGLE_CLIENT_SECRET,
            "client_email": process.env.GOOGLE_CLIENT_EMAIL
        }
    });

    const anthropic = createAnthropicVertex({
        projectId: process.env.Vertex_Ai_ProjectID,
        region: process.env.Vertex_Ai_Location,
        headers: {
            'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15',
        },
        googleAuth: googleAuth
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