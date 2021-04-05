import React from 'react';
import { LinkProps } from 'react-router-dom';

import { Container, ButtonContainer } from './styled';

export interface Props {
  bgColor?: 'primary' | 'secondary' | 'default';
}

const ButtonLink: React.FC<Props & LinkProps> = ({
  bgColor,
  children,
  ...rest
}) => {
  return (
    <Container bgColor={bgColor}>
      <ButtonContainer {...rest}>{children}</ButtonContainer>
    </Container>
  );
};

export default ButtonLink;
