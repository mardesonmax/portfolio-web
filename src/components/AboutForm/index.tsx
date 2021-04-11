import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import Button from '../Button';
import Input from '../Input';
import LoadingSubmit from '../LoadingSubmit';
import Textarea from '../Textarea';

import { Container } from './styled';

interface About {
  title: string;
  description: string;
}

interface Props {
  handleSubmit: (data: About) => void;
  handleAbort: () => void;
  loadingSubmit: boolean;
  about?: About;
}

const AboutForm: React.FC<Props> = ({
  handleSubmit,
  handleAbort,
  loadingSubmit,
  about,
}) => {
  const formRef = useRef<FormHandles>(null);

  return (
    <Container edit={!!about}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input label="Título" name="title" defaultValue={about?.title} />
        <Textarea
          label="Descrição"
          name="description"
          defaultValue={about?.description}
        />
        <div>
          <Button type="button" bgColor="secondary" onClick={handleAbort}>
            Cancelar
          </Button>

          {loadingSubmit ? (
            <LoadingSubmit />
          ) : (
            <Button type="submit">Enviar</Button>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default AboutForm;
