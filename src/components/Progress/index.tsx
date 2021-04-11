import React from 'react';

import { Container } from './styled';

interface Props {
  value: number;
  skill: string;
}

const Progress: React.FC<Props> = ({ value, skill }) => {
  return (
    <Container progress={value}>
      <span />
      <p>{skill}</p>
    </Container>
  );
};

export default Progress;
