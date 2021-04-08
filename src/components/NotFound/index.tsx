import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styled';

import notFoundSvg from '../../assets/not_found.svg';

interface Props {
  title: string;
  description: string;
}

const NotFound: React.FC<Props> = ({ title, description }) => {
  return (
    <Container>
      <div>
        <img src={notFoundSvg} alt="Not Found" />
        <h1>{title}</h1>
        <p>{description}</p>

        <Link to="/projects">Ir para projetos</Link>
      </div>
    </Container>
  );
};

export default NotFound;
