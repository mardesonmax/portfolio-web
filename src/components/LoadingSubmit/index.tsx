import React from 'react';

import { Container } from './styled';

const LoadingSubmit: React.FC = () => {
  return (
    <Container>
      <div className="loading">
        <div />
        <div />
        <div />
      </div>
    </Container>
  );
};

export default LoadingSubmit;
