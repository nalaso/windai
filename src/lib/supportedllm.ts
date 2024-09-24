export const supportedllm = ['githubMistral','githubOpenAI:gpt-4o', 'mistral', 'groq', 'cohere', 'google']

export const isModelSupported = (modelId: string) => {
    return supportedllm.some(llm => modelId.toLowerCase().startsWith(llm.toLowerCase()));
};