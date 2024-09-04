import { create } from "zustand";

interface UIInput {
    input: string
    loading: boolean
    setInput: (val: string) => void
    setLoading: (val: boolean) => void
}

export const useUIState = create<UIInput>((set) => ({
    input: "",
    loading: false,
    setInput: (val) => set((state) => ({ input: val })),
    setLoading: (val) => set((state) => ({ loading: val }))
}));