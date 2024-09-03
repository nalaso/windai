import { createAnthropicVertex } from "anthropic-vertex-ai";
import { GoogleAuth } from "google-auth-library";

const googleAuth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
    credentials: {
        "private_key": process.env.GOOGLE_CLIENT_SECRET,
        "client_email": process.env.GOOGLE_CLIENT_EMAIL
    }
});

export const anthropic = createAnthropicVertex({
    projectId: process.env.Vertex_Ai_ProjectID,
    region: process.env.Vertex_Ai_Location,
    headers: {
        'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15',
    },
    googleAuth: googleAuth
});