import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from "react";

// 1. Define the Theme type
type Theme = "light" | "dark" | "system";

// 2. Define the context shape
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// 3. Create context with a default value
const ThemeProviderContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => null,
});

// 4. Props for the ThemeProvider component
interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// 5. Custom hook for consuming the context
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
