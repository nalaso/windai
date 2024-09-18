interface Model {
    modelId: string,
    model: string,
}

const openaiModels:Model[] = [ 
    {
        modelId: 'openai:o1-mini',
        model: 'o1-mini',
    },
    {
        modelId: 'openai:o1-preview',
        model: 'o1-preview',
    },
    {
        modelId: 'openai:gpt-4o',
        model: 'gpt-4o',
    },
    {
        modelId: 'openai:gpt-4o-mini',
        model: 'gpt-4o-mini',
    },
    {
        modelId: 'openai:gpt-4-turbo',
        model: 'gpt-4-turbo',
    },
    {
        modelId: 'openai:gpt-4',
        model: 'gpt-4',
    },
    {
        modelId: 'openai:gpt-3.5-turbo',
        model: 'gpt-3.5-turbo',
    },
 ];

 const llms:Model[] = [
    {
        modelId: 'anthropic:claude-3-opus-20240229',
        model: 'claude-3-opus-20240229',
    },
    {
        modelId: 'anthropic:claude-3-sonnet-20240229',
        model: 'claude-3-sonnet-20240229',
    },
    {
        modelId: 'anthropic:claude-3-haiku-20240307',
        model: 'claude-3-haiku-20240307',
    },
    {
        modelId: 'anthropic:claude-3-5-sonnet-20240620',
        model: 'claude-3-5-sonnet-20240620',
    },
 ];

 const anthropicVertexModels:Model[] = [
    {
        modelId: 'anthropicVertex:claude-3-opus@20240229',
        model: 'claude-3-opus@20240229',
    },
    {
        modelId: 'anthropicVertex:claude-3-sonnet@20240229',
        model: 'claude-3-sonnet@20240229',
    },
    {
        modelId: 'anthropicVertex:claude-3-haiku@20240307',
        model: 'claude-3-haiku@20240307',
    },
    {
        modelId: 'anthropicVertex:claude-3-5-sonnet@20240620',
        model: 'claude-3-5-sonnet@20240620',
    },
 ];

 const azureModels:Model[] = [];

 const bedrockModels:Model[] = [
    {
        modelId: 'bedrock:amazon.titan-tg1-large',
        model: 'titan-tg1-large',
    },
    {
        modelId: 'bedrock:amazon.titan-text-express-v1',
        model: 'titan-text-express-v1',
    },
    {
        modelId: 'bedrock:anthropic.claude-3-5-sonnet-20240620-v1:0',
        model: 'claude-3-5-sonnet-20240620-v1:0',
    },
    {
        modelId: 'bedrock:anthropic.claude-3-opus-20240229-v1:0',
        model: 'claude-3-opus-20240229-v1:0',
    },
    {
        modelId: 'bedrock:anthropic.claude-3-sonnet-20240229-v1:0',
        model: 'claude-3-sonnet-20240229-v1:0',
    },
    {
        modelId: 'bedrock:anthropic.claude-3-haiku-20240307-v1:0',
        model: 'claude-3-haiku-20240307-v1:0',
    },
    {
        modelId: 'bedrock:anthropic.claude-v2:1',
        model: 'claude-v2:1',
    },
    {
        modelId: 'bedrock:cohere.command-r-v1:0',
        model: 'command-r-v1:0',
    },
    {
        modelId: 'bedrock:cohere.command-r-plus-v1:0',
        model: 'command-r-plus-v1:0',
    },
    {
        modelId: 'bedrock:meta.llama2-13b-chat-v1',
        model: 'llama2-13b-chat-v1',
    },
    {
        modelId: 'bedrock:meta.llama2-70b-chat-v1',
        model: 'llama2-70b-chat-v1',
    },
    {
        modelId: 'bedrock:meta.llama3-8b-instruct-v1:0',
        model: 'llama3-8b-instruct-v1:0',
    },
    {
        modelId: 'bedrock:meta.llama3-70b-instruct-v1:0',
        model: 'llama3-70b-instruct-v1:0',
    },
    {
        modelId: 'bedrock:mistral.mistral-7b-instruct-v0:2',
        model: 'mistral-7b-instruct-v0:2',
    },
    {
        modelId: 'bedrock:mistral.mixtral-8x7b-instruct-v0:1',
        model: 'mixtral-8x7b-instruct-v0:1',
    },
    {
        modelId: 'bedrock:mistral.mistral-large-2402-v1:0',
        model: 'mistral-large-2402-v1:0',
    }
 ];

 const googleModels:Model[] = [
    {
        modelId: 'google:gemini-1.5-pro-latest',
        model: 'gemini-1.5-pro-latest',
    },
    {
        modelId: 'google:gemini-1.5-pro',
        model: 'gemini-1.5-pro',
    },
    {
        modelId: 'google:gemini-1.5-flash-latest',
        model: 'gemini-1.5-flash-latest',
    },
    {
        modelId: 'google:gemini-1.5-flash',
        model: 'gemini-1.5-flash',
    },
 ];

 const vertexModels:Model[] = [
    {
        modelId: 'vertex:gemini-1.5-flash',
        model: 'gemini-1.5-flash',
    },
    {
        modelId: 'vertex:gemini-1.5-pro',
        model: 'gemini-1.5-pro',
    },
    {
        modelId: 'vertex:gemini-1.0-pro-vision',
        model: 'gemini-1.0-pro-vision',
    },
    {
        modelId: 'vertex:gemini-1.0-pro',
        model: 'gemini-1.0-pro',
    },
 ];

const mistralModels:Model[] = [
    {
        modelId: 'mistral:mistral-large-latest',
        model: 'mistral-large-latest',
    },
    {
        modelId: 'mistral:mistral-medium-latest',
        model: 'mistral-medium-latest',
    },
    {
        modelId: 'mistral:mistral-small-latest',
        model: 'mistral-small-latest',
    },
    {
        modelId: 'mistral:open-mistral-nemo',
        model: 'open-mistral-nemo',
    },
    {
        modelId: 'mistral:open-mixtral-8x22b',
        model: 'open-mixtral-8x22b',
    },
    {
        modelId: 'mistral:open-mixtral-8x7b',
        model: 'open-mixtral-8x7b',
    },
    {
        modelId: 'mistral:open-mistral-7b',
        model: 'open-mistral-7b',
    },
];

const cohereModels:Model[] = [
    {
        modelId: 'cohere:command-light',
        model: 'command-light',
    },
    {
        modelId: 'cohere:command-light-nightly',
        model: 'command-light-nightly',
    },
    {
        modelId: 'cohere:command-nightly',
        model: 'command-nightly',
    },
    {
        modelId: 'cohere:command-r',
        model: 'command-r',
    },
    {
        modelId: 'cohere:command-r-08-2024',
        model: 'command-r-08-2024',
    },
    {
        modelId: 'cohere:command-r-plus',
        model: 'command-r-plus',
    },
    {
        modelId: 'cohere:command-r-plus-08-2024',
        model: 'command-r-plus-08-2024',
    },
];

const groqModels:Model[] = [
    {
        modelId: 'groq:gemma2-9b-it',
        model: 'gemma2-9b-it',
    },
    {
        modelId: 'groq:llama-3.1-70b-versatile',
        model: 'llama-3.1-70b-versatile',
    },
    {
        modelId: 'groq:llama-3.1-8b-instant',
        model: 'llama-3.1-8b-instant',
    },
    {
        modelId: 'groq:llama3-70b-8192',
        model: 'llama3-70b-8192',
    },
    {
        modelId: 'groq:mixtral-8x7b-32768',
        model: 'mixtral-8x7b-32768',
    },
];

const ollamaModels:Model[] = []

export const models = {
    openai: openaiModels,
    anthropic: llms,
    anthropicVertex: anthropicVertexModels,
    azure: azureModels,
    bedrock: bedrockModels,
    google: googleModels,
    vertex: vertexModels,
    mistral: mistralModels,
    cohere: cohereModels,
    groq: groqModels,
    ollama: ollamaModels,
};