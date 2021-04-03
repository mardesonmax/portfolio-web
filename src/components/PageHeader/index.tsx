import React from 'react';

import { Container } from './styled';

interface Props {
  title: string;
}

const PageHeader: React.FC<Props> = ({ children, title }) => {
  return (
    <Container>
      <h1>{title}</h1>
      {children}
    </Container>
  );
};

export default PageHeader;
