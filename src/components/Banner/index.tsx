import React from 'react';

import { Container, Content } from './styled';

interface Props {
  title: string;
  subTitle: string;
}

const Banner: React.FC<Props> = ({ subTitle, title }) => {
  return (
    <Container>
      <Content>
        <h3>{title}</h3>
        <h1>{subTitle}</h1>
      </Content>
    </Container>
  );
};

export default Banner;
