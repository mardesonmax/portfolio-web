import React, { useCallback, useEffect, useState } from 'react';
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
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (active) {
      setConfirm(false);
    }
  }, [active]);

  const handleConfirm = useCallback(() => {
    setConfirm(true);
    setConfirmDelete(true);
  }, [setConfirmDelete]);

  return (
    <Container active={active}>
      <Content confirm={confirm}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <Button bgColor="secondary" onClick={handleConfirm}>
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
