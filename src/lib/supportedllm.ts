export const supportedllm = [ 'groq', 'cohere', 'vertex', 'google', 'anthropicVertex:claude-3-5-sonnet@20240620']

export const isModelSupported = (modelId: string) => {
    return supportedllm.some(llm => modelId.toLowerCase().startsWith(llm.toLowerCase()));
};