import { create } from "zustand";

interface AuthModalStore {
    isOpen: boolean;
    toggle: () => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));