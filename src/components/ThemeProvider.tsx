import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

const getInitialTheme = (storageKey: string, fallback: Theme): Theme => {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = window.localStorage.getItem(storageKey) as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* ignore */
  }
  // Default to dark — user can opt into light via toggle.
  return fallback;
};

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'lhllm-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme(storageKey, defaultTheme));

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);

  const value: ThemeProviderState = {
    theme,
    setTheme: (t) => {
      try {
        window.localStorage.setItem(storageKey, t);
      } catch {
        /* ignore */
      }
      setThemeState(t);
    },
    toggle: () => {
      setThemeState((prev) => {
        const next: Theme = prev === 'dark' ? 'light' : 'dark';
        try {
          window.localStorage.setItem(storageKey, next);
        } catch {
          /* ignore */
        }
        return next;
      });
    },
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
