"use client"
import { create } from "zustand";

interface ModelStore {
    initialModel: string;
    modifierModel: string;
    descriptiveModel: string;
    imageModel: string;
    setInitialModel: (model: string) => void;
    setModifierModel: (model: string) => void;
    setDescriptiveModel: (model: string) => void;
    setImageModel: (model: string) => void;
}

const getLocalStorageItem = (key: string, defaultValue: string): string => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
};

export const useModel = create<ModelStore>((set) => ({
    initialModel: getLocalStorageItem('initialModel', 'anthropicVertex:claude-3-5-sonnet@20240620'),
    modifierModel: getLocalStorageItem('modifierModel', 'groq:llama-3.1-70b-versatile'),
    descriptiveModel: getLocalStorageItem('descriptiveModel', 'anthropicVertex:claude-3-5-sonnet@20240620'),
    imageModel: getLocalStorageItem('imageModel', 'anthropicVertex:claude-3-5-sonnet@20240620'),
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
    setImageModel: (model) => set(() => {
        localStorage.setItem('imageModel', model);
        return { imageModel: model };
    }),
}));