import React from 'react';
import Button from '../Button';

import { Container, Content } from './styled';

interface Props {
  title: string;
  description: string;
  active?: boolean;
  setProps: {
    setModalActive(active: boolean): void;
    setConfirmDelete(confirmDelete: boolean): void;
  };
}

const Modal: React.FC<Props> = ({ setProps, active, title, description }) => {
  const { setConfirmDelete, setModalActive } = setProps;

  return (
    <Container active={active}>
      <Content>
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <Button bgColor="secondary" onClick={() => setConfirmDelete(true)}>
            Confirmar
          </Button>
          <Button bgColor="primary" onClick={() => setModalActive(false)}>
            Cancelar
          </Button>
        </div>
      </Content>
    </Container>
  );
};

export default Modal;
