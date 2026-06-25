import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { id: 'sovereign-gold', name: 'Sovereign Gold', type: 'dark' },
  { id: 'chalk-rose', name: 'Chalk & Rose', type: 'light' },
  { id: 'aurora', name: 'Aurora', type: 'dark' },
  { id: 'rose-midnight', name: 'Rose Midnight', type: 'dark' },
  { id: 'eclipse', name: 'Eclipse', type: 'dark' },
  { id: 'sage', name: 'Sage', type: 'dark' },
  { id: 'ember', name: 'Ember', type: 'dark' }
];

export function ThemeProvider({ children }) {
  // Default to eclipse
  const [activeTheme, setActiveThemeState] = useState('eclipse');

  useEffect(() => {
    const saved = localStorage.getItem('app-theme');
    if (saved) {
      setActiveThemeState(saved);
    }
  }, []);

  const setActiveTheme = (themeId, save = true) => {
    setActiveThemeState(themeId);
    if (save) {
      localStorage.setItem('app-theme', themeId);
    }
  };

  useEffect(() => {
    // Remove all previous theme classes
    themes.forEach((t) => {
      document.documentElement.classList.remove(`theme-${t.id}`);
    });
    // Add current theme class
    document.documentElement.classList.add(`theme-${activeTheme}`);
    
    // Toggle dark class
    const themeObj = themes.find(t => t.id === activeTheme);
    if (themeObj?.type === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
