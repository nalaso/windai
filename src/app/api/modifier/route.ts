import { generateText, streamText } from 'ai';
import { createAnthropicVertex } from 'anthropic-vertex-ai';
import { getModifierPromt } from '@/lib/prompt';
import { GoogleAuth } from 'google-auth-library';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { modifyDescription, precode } = await req.json();

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