import { createAnthropic } from '@ai-sdk/anthropic';
import { createAnthropicVertex } from "anthropic-vertex-ai";
import { GoogleAuth } from "google-auth-library";
import { experimental_createProviderRegistry as createProviderRegistry } from 'ai';

const googleAuth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
    credentials: {
        "private_key": process.env.GOOGLE_CLIENT_SECRET,
        "client_email": process.env.GOOGLE_CLIENT_EMAIL
    }
});

const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    headers: {
        'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15',
    },
});

const anthropicVertex = createAnthropicVertex({   // full documentation here: ✦ https://github.com/nalaso/anthropic-vertex-ai
    projectId: process.env.Vertex_Ai_ProjectID,
    region: process.env.Vertex_Ai_Location,
    headers: {
        'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15',
    },
    googleAuth: googleAuth
});

const anthropicRegistry = createProviderRegistry({
    anthropic: anthropic,
    anthropicVertex: anthropicVertex,
});

type Models = 
'anthropic:claude-3-opus-20240229' | 
'anthropic:claude-3-sonnet-20240229' |
'anthropic:claude-3-haiku-20240307' |
'anthropic:claude-3-5-sonnet-20240620' | 
'anthropicVertex:claude-3-opus@20240229' | 
'anthropicVertex:claude-3-sonnet@20240229' |
'anthropicVertex:claude-3-haiku@20240307' |
'anthropicVertex:claude-3-5-sonnet@20240620' ;

const defaultModel:Models = 'anthropicVertex:claude-3-5-sonnet@20240620';

export const anthropicModel = (model?:Models) => anthropicRegistry.languageModel(model??defaultModel);