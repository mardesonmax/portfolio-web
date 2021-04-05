import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styled';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: 'primary' | 'secondary' | 'default';
}

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  );
};

export default Button;
