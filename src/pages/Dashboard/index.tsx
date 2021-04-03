import React from 'react';
import PageHeader from '../../components/PageHeader';

import { Container, Content } from './styled';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Content>
        <PageHeader title="Página Inicial" />
      </Content>
    </Container>
  );
};

export default Dashboard;
