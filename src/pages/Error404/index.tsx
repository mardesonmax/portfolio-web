import React from 'react';

import { Container } from './styled';

const Error404: React.FC = () => {
  return (
    <Container>
      <div className="error">
        <span>
          Error <h1>404</h1>
        </span>
        <p>A página solicitada não foi encontrada!</p>
      </div>
    </Container>
  );
};

export default Error404;
