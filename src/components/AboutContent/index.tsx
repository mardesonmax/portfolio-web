import React from 'react';
import Button from '../Button';

import { Container } from './styled';

interface About {
  id: string;
  title: string;
  description: string;
}

interface Props {
  about: About;
  handleDelete?: (about: About) => void;
  handleAboutEdit?: (id: string) => void;
}

const AboutContent: React.FC<Props> = ({
  about,
  handleDelete,
  handleAboutEdit,
}) => {
  return (
    <Container>
      <h2>{about.title}</h2>
      <p>{about.description}</p>

      {handleDelete && handleAboutEdit && (
        <div>
          <Button onClick={() => handleAboutEdit(about.id)}>Editar</Button>

          <Button onClick={() => handleDelete(about)} bgColor="secondary">
            Excluir
          </Button>
        </div>
      )}
    </Container>
  );
};

export default AboutContent;
