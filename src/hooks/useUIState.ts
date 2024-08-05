import { create } from "zustand";

interface UIInput {
    input: string
    setInput: (val: string) => void
}

export const useUIState = create<UIInput>((set) => ({
    input: "",
    setInput: (val) => set((state) => ({ input: val })),
}));