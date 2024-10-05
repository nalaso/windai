export const supportedllm = ['glhf', 'together', 'mistral:pixtral', 'groq', 'google']

export const isModelSupported = (modelId: string) => {
    return supportedllm.some(llm => modelId.toLowerCase().startsWith(llm.toLowerCase()));
};