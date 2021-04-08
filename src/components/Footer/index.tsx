import React from 'react';

import { Container, Content } from './styled';

const Footer: React.FC = () => {
  return (
    <Container>
      <Content>
        <p>
          Desenvolvido com ❤️ por
          <a
            href="https://www.facebook.com/mardeson.pereira.7"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mardeson Pereira
          </a>
        </p>
      </Content>
    </Container>
  );
};

export default Footer;
