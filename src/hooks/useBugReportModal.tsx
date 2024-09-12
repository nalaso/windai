import { create } from 'zustand';

interface BugReportModalStore {
  isOpen: boolean;
  toggle: () => void;
}

export const useBugReportModal = create<BugReportModalStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));