import { create } from 'zustand';
import darkThemeUrl from 'primereact/resources/themes/lara-dark-blue/theme.css?url';
import { storage } from '@/utils/storage';

export type ThemeMode = 'light' | 'dark';

const DARK_LINK_ID = 'prime-theme-dark';

export function getInitialTheme(): ThemeMode {
  // Default to dark unless the user has explicitly chosen light.
  return storage.get<ThemeMode>('theme') === 'light' ? 'light' : 'dark';
}

// Lara dark theme is loaded lazily as an override link on top of the bundled
// light theme (imported in main.tsx). Toggling adds/removes that link.
export function applyTheme(mode: ThemeMode): void {
  const existing = document.getElementById(DARK_LINK_ID);

  if (mode === 'dark' && !existing) {
    const link = document.createElement('link');
    link.id = DARK_LINK_ID;
    link.rel = 'stylesheet';
    link.href = darkThemeUrl;
    document.head.appendChild(link);
  } else if (mode === 'light' && existing) {
    existing.remove();
  }

  document.documentElement.classList.toggle('theme-dark', mode === 'dark');
}

interface AppState {
  // theme
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;

  // global loader (ref-counted manual control; pair every show with a hide)
  loaderCount: number;
  showLoader: () => void;
  hideLoader: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  theme: getInitialTheme(),
  setTheme: (mode) => {
    applyTheme(mode);
    storage.set('theme', mode);
    set({ theme: mode });
  },
  toggleTheme: () => get().setTheme(get().theme === 'dark' ? 'light' : 'dark'),

  loaderCount: 0,
  showLoader: () => set((s) => ({ loaderCount: s.loaderCount + 1 })),
  hideLoader: () => set((s) => ({ loaderCount: Math.max(0, s.loaderCount - 1) })),
}));
