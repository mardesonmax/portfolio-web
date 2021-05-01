import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../hooks/theme';

import { Container } from './styled';

const ButtonTheme: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Container
      className="theme"
      type="button"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <FiMoon /> : <FiSun className="sun" />}
    </Container>
  );
};

export default ButtonTheme;
