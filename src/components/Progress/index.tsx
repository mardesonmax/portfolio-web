import React, { useEffect, useState } from 'react';

import { Container } from './styled';

interface Props {
  value: number;
  skill: string;
}

const Progress: React.FC<Props> = ({ value, skill }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    for (let x = 0; x <= value; x++) {
      setTimeout(() => {
        setProgress(x);
      }, 30 * x);
    }
  }, [value]);

  return (
    <Container progress={progress}>
      <span />
      <p>{skill}</p>
    </Container>
  );
};

export default Progress;
