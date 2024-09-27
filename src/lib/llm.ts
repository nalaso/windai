import { createAnthropic } from '@ai-sdk/anthropic';
import { createAnthropicVertex } from "anthropic-vertex-ai";
import { createOpenAI } from '@ai-sdk/openai';
import { createAzure } from '@ai-sdk/azure';
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createVertex } from '@ai-sdk/google-vertex';
import { createCohere } from '@ai-sdk/cohere';
import { createMistral } from '@ai-sdk/mistral';
import { createOllama } from 'ollama-ai-provider';
import { GoogleAuth } from "google-auth-library";
import { experimental_createProviderRegistry as createProviderRegistry } from 'ai';

const googleAuth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
    credentials: {
        "private_key": process.env.GOOGLE_CLIENT_SECRET,
        "client_email": process.env.GOOGLE_CLIENT_EMAIL
    }
});

const openai = createOpenAI({
    baseURL: process.env.OPENAI_API_URL,
    apiKey: process.env.OPENAI_API_KEY,
});
  
const azure = createAzure({
    resourceName: process.env.AZURE_RESOURCE_NAME,
    apiKey: process.env.AZURE_API_KEY,
});

const bedrock = createAmazonBedrock({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

const anthropic = createAnthropic({
    baseURL: process.env.ANTHROPIC_API_URL,
    apiKey: process.env.ANTHROPIC_API_KEY,
    headers: {
        'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15',
    },
});

const google = createGoogleGenerativeAI({
    baseURL: process.env.GOOGLE_GENERATIVE_AI_API_URL,
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const vertex = createVertex({
  project: process.env.GOOGLE_VERTEX_PROJECT,
  location: process.env.GOOGLE_VERTEX_LOCATION,
  googleAuthOptions:{
    credentials: {
      "private_key": process.env.GOOGLE_CLIENT_SECRET,
      "client_email": process.env.GOOGLE_CLIENT_EMAIL
    }
  }
});

const mistral = createMistral({
    baseURL: process.env.MISTRAL_API_URL,
    apiKey: process.env.MISTRAL_API_KEY,
});

const codestral = createMistral({
    baseURL: process.env.CODESTRAL_API_URL,
    apiKey: process.env.CODESTRAL_API_KEY,
});

const cohere = createCohere({
    baseURL: process.env.COHERE_API_URL,
    apiKey: process.env.COHERE_API_KEY,
});

const groq = createOpenAI({
    baseURL: process.env.GROQ_API_URL,
    apiKey: process.env.GROQ_API_KEY,
});

const ollama = createOllama({
    baseURL: process.env.OLLAMA_API_URL,
});

const githubOpenAI = createOpenAI({
    baseURL: process.env.GITHUB_OPENAI_API_URL,
    apiKey: process.env.GITHUB_OPENAI_API_KEY,
});

const githubMistral = createMistral({
    baseURL: process.env.GITHUB_MISTRAL_API_URL,
    apiKey: process.env.GITHUB_MISTRAL_API_KEY,
});

const openRouter = createOpenAI({
    baseURL: process.env.OPENROUTER_API_URL,
    apiKey: process.env.OPENROUTER_API_KEY,
});

const together = createOpenAI({
    baseURL: process.env.TOGETHER_API_URL,
    apiKey: process.env.TOGETHER_API_KEY,
});

const anthropicVertex = createAnthropicVertex({   // full documentation here: ✦ https://github.com/nalaso/anthropic-vertex-ai
    projectId: process.env.ANTHROPIC_VERTEX_PROJECT,
    region: process.env.ANTHROPIC_VERTEX_LOCATION,
    headers: {
        'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15',
    },
    googleAuth: googleAuth
});

const modelRegistry = createProviderRegistry({
    anthropic: anthropic,
    anthropicVertex: anthropicVertex,
    openai: openai,
    azure: azure,
    bedrock: bedrock,
    google: google,
    vertex: vertex,
    mistral: mistral,
    codestral: codestral,
    githubOpenAI: githubOpenAI,
    githubMistral: githubMistral,
    openRouter: openRouter,
    together: together,
    cohere: cohere,
    groq: groq,
    ollama: ollama,
});

export const llm = (model:string) => modelRegistry.languageModel(model);