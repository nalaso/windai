import { getLocalStorageItem } from '@/lib/localStorage';
import { create } from 'zustand'

type Language = 'javascript' | 'typescript';

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
}

const useLangauge = create<LanguageState>((set) => ({
  language: getLocalStorageItem('language', 'javascript') as Language,
  setLanguage: (language: Language) => set({ language }),
}))

export default useLangauge