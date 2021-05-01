import React from 'react';
import { ThemeProvider } from './theme';

import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
