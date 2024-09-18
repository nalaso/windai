import { create } from "zustand";

interface ModelStore {
    initialModel: string;
    modifierModel: string;
    descriptiveModel: string;
    setInitialModel: (model: string) => void;
    setModifierModel: (model: string) => void;
    setDescriptiveModel: (model: string) => void;
}

export const useModel = create<ModelStore>((set) => ({
    initialModel: localStorage.getItem('initialModel') || 'anthropicVertex:claude-3-5-sonnet@20240620',
    modifierModel: localStorage.getItem('modifierModel') || 'groq:llama-3.1-70b-versatile',
    descriptiveModel: localStorage.getItem('descriptiveModel') || 'anthropicVertex:claude-3-5-haiku@20240620',
    setInitialModel: (model) => set(() => {
        localStorage.setItem('initialModel', model);
        return { initialModel: model };
    }),
    setModifierModel: (model) => set(() => {
        localStorage.setItem('modifierModel', model);
        return { modifierModel: model };
    }),
    setDescriptiveModel: (model) => set(() => {
        localStorage.setItem('descriptiveModel', model);
        return { descriptiveModel: model };
    }),
}));