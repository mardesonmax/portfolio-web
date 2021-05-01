import React, { createContext, useContext } from 'react';
import { ThemeProvider as StyledTheme } from 'styled-components';
import usePersistedState from '../utils/usePersistedState';
import themes from '../styles/themes';

export type InitialState = 'light' | 'dark';

interface IThemeContextData {
  theme: InitialState;
  setTheme(theme: InitialState): void;
}

const ThemeContext = createContext<IThemeContextData>({} as IThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = usePersistedState<InitialState>('theme', 'light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledTheme theme={themes[theme]}>{children}</StyledTheme>
    </ThemeContext.Provider>
  );
};

const useTheme = (): IThemeContextData => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }

  return context;
};

export { ThemeProvider, useTheme };
