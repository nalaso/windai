import { create } from 'zustand'

type Theme = 'Default' | 'Ruby' | 'Sapphire' | 'Emerald' | 'Windows98' | 'Daylight' | 'Midnight' | 'Pastel' | 'DeepSea'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const useTheme = create<ThemeState>((set) => ({
  theme: 'Default',
  setTheme: (theme: Theme) => set({ theme }),
}))

export default useTheme