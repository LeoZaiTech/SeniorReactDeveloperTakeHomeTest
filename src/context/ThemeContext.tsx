import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

//Theme Context Data Structure Interface

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  statusTodo: string;
  statusInProgress: string;
  statusDone: string;
  priorityLow: string;
  priorityMedium: string;
  priorityHigh: string;
}

const lightColors: ThemeColors = {
  background: '#f5f5f5',
  surface: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#666666',
  border: '#e0e0e0',
  statusTodo: '#6b7280',
  statusInProgress: '#3b82f6',
  statusDone: '#22c55e',
  priorityLow: '#22c55e',
  priorityMedium: '#f59e0b',
  priorityHigh: '#ef4444',
};

const darkColors: ThemeColors = {
  background: '#121212',
  surface: '#1e1e1e',
  text: '#f5f5f5',
  textSecondary: '#a0a0a0',
  border: '#333333',
  statusTodo: '#9ca3af',
  statusInProgress: '#60a5fa',
  statusDone: '#4ade80',
  priorityLow: '#4ade80',
  priorityMedium: '#fbbf24',
  priorityHigh: '#f87171',
};


const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);




interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');


  //ThemeProvider is a wrapper component that holds the theme state.//
  //  I type it with React.FC and the props interface to ensure TypeScript knows //
  // it accepts children. //
  //  The useState hook initializes to light mode and is constrained //
  // to my Theme type so it can only ever be 'light' or 'dark

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

//Use Theme Hook

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  // Guard clause: Ensure we're inside a ThemeProvider
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // Safe to return - TypeScript now knows context is ThemeContextValue, 
  // not undefined
  return context;
};
