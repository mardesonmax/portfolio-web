import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import themes from './styles/themes';

import AppProvider from './hooks';
import GlobalStyles from './styles/global';
import Routes from './routes';
import Header from './components/Header';
import usePersistedState from './utils/usePersistedState';

export type InitialState = 'light' | 'dark';

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<InitialState>('theme', 'light');

  return (
    <Router>
      <ThemeProvider theme={themes[theme]}>
        <AppProvider>
          <Header StateProps={{ theme, setTheme }} />
          <Routes />
        </AppProvider>
        <GlobalStyles />
        <ToastContainer autoClose={3000} className="toast-container" />
      </ThemeProvider>
    </Router>
  );
};

export default App;
