import React from 'react';
import { useTheme } from '../theme/ThemeContext';

/**
 * PUBLIC_INTERFACE
 * ThemeToggle
 * Small theme switcher used in NavBar.
 */
export default function ThemeToggle({ inline = false }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost"
      style={{
        position: inline ? 'static' : 'absolute',
        right: inline ? 0 : 16,
        bottom: inline ? 0 : 16,
        margin: '10px',
        justifySelf: 'center',
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
