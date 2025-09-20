import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  // PUBLIC_INTERFACE
  setTheme: (_t) => {},
  // PUBLIC_INTERFACE
  toggleTheme: () => {},
});

/**
 * PUBLIC_INTERFACE
 * useTheme
 * Access theme value and control functions.
 */
export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * PUBLIC_INTERFACE
 * ThemeProvider
 * Provides theme state and writes to document dataset for CSS to react.
 */
export function ThemeProvider({ initialTheme = 'light', onThemeChange, children }) {
  const [theme, setThemeState] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    onThemeChange && onThemeChange(theme);
  }, [theme, onThemeChange]);

  const setTheme = useCallback((t) => setThemeState(t), []);
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
