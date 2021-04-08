import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Container } from './styled';

const Error404: React.FC = () => {
  return (
    <Container>
      <div className="error">
        <FiAlertCircle />
        <span>
          Error <h1>404</h1>
        </span>
        <p>A página solicitada não foi encontrada!</p>
      </div>
    </Container>
  );
};

export default Error404;
