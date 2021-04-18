import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import Button from '../Button';
import Input from '../Input';
import LoadingSubmit from '../LoadingSubmit';
import Textarea from '../Textarea';

import { Container } from './styled';
import getValidationErrors from '../../utils/getValidationErrors';
import About from '../../pages/About';

interface About {
  id: string;
  title: string;
  description: string;
}

interface Props {
  handleAbort: () => void;
  about?: About;
  setAbouts: (about: React.SetStateAction<About[]>) => void;
}

const AboutForm: React.FC<Props> = ({ handleAbort, setAbouts, about }) => {
  const formRef = useRef<FormHandles>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setLoadingSubmit(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required('Titulo obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        let response: AxiosResponse<About>;

        if (about) {
          response = await api.put(`/abouts/${about.id}`, data);

          setAbouts((state) =>
            state.map((item) => {
              if (item.id === response.data.id) {
                return response.data;
              }
              return item;
            }),
          );
        } else {
          response = await api.post('/abouts', data);

          setAbouts((state) => [...state, response.data]);
          formRef.current?.reset();
          window.scrollTo(0, document.querySelector('html')?.scrollHeight || 0);
        }

        toast('Informação inserida com sucesso.', {
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        toast('Algo deu errado, tente novamente.', {
          type: 'error',
        });
      } finally {
        setLoadingSubmit(false);
      }
    },
    [about, setAbouts],
  );

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
