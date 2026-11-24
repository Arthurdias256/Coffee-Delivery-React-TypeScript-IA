import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import type { ThemeMode } from "../styles/themes";
import { ThemeContext, type ThemeContextValue } from "./contextValues";

export const THEME_STORAGE_KEY = "coffee-delivery:theme";

function parseStoredMode(raw: string): ThemeMode | null {
  const value: unknown = JSON.parse(raw);
  return value === "light" || value === "dark" ? value : null;
}

function getSystemMode(): ThemeMode {
  if (typeof window.matchMedia !== "function") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [systemMode, setSystemMode] = useState(getSystemMode);
  const [preference, setPreference] = useLocalStorage<ThemeMode | null>(
    THEME_STORAGE_KEY,
    null,
    "local",
    parseStoredMode,
  );
  const mode = preference ?? systemMode;

  const toggleMode = useCallback(() => {
    setPreference(mode === "light" ? "dark" : "light");
  }, [mode, setPreference]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = (event: MediaQueryListEvent) => setSystemMode(event.matches ? "dark" : "light");
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, toggleMode }),
    [mode, toggleMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
