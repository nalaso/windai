import { create } from "zustand";

interface UIInput {
    input: string
    imageBase64: string
    loading: boolean
    uiType: string
    setInput: (val: string) => void
    setLoading: (val: boolean) => void
    setImageBase64: (val: string) => void
    setUIType: (val: string) => void
}

export const useUIState = create<UIInput>((set) => ({
    input: "",
    imageBase64: "",
    loading: false,
    uiType: "shadcn-react",
    setInput: (val) => set((state) => ({ input: val })),
    setLoading: (val) => set((state) => ({ loading: val })),
    setImageBase64: (val) => set((state) => ({ imageBase64: val })),
    setUIType: (val) => set((state) => ({ uiType: val }))
}));