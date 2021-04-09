import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiChevronLeft, FiPlus } from 'react-icons/fi';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';

import { Container, Content, AboutContact } from './styled';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import ButtonLink from '../../components/ButtonLink';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';

interface IAbout {
  id: string;
  title: string;
  description: string;
}

const About: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [abouts, setAbouts] = useState<IAbout[]>([]);
  const [aboutEdit, setAboutEdit] = useState('');
  const [aboutPlus, setAboutPlus] = useState(false);
  const [aboutRemoved, setAboutRemoved] = useState<IAbout>({} as IAbout);
  const [modalActive, setModalActive] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/abouts');
        setAbouts(response.data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required('Titulo obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (aboutEdit) {
          const response = await api.put(`/abouts/${aboutEdit}`, data);

          setAbouts((state) =>
            state.map((about) => {
              if (about.id === response.data.id) {
                return response.data;
              }
              return about;
            }),
          );

          toast('Informação alterada com sucesso.', {
            type: 'success',
          });

          setAboutEdit('');

          return;
        }

        const response = await api.post('/abouts', data);

        setAbouts((state) => [...state, response.data]);
        formRef.current?.reset();

        toast('Informação inserida com sucesso.', {
          type: 'success',
        });

        setAboutPlus(false);

        window.scrollTo(0, document.querySelector('html')?.scrollHeight || 0);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        toast('Algo deu errado, tente novamente.', {
          type: 'error',
        });
      }
    },
    [aboutEdit],
  );

  const handleDelete = useCallback(
    (about: IAbout) => {
      setAboutRemoved(about);
      setModalActive(true);
    },
    [setAboutRemoved, setModalActive],
  );

  const handleAbort = useCallback(() => {
    setAboutEdit('');
  }, []);

  const handleAboutEdit = useCallback((id: string) => {
    setAboutPlus(false);
    setAboutEdit(id);
  }, []);

  const handleAbortPlus = useCallback(() => {
    setAboutPlus(true);
    setAboutEdit('');
  }, []);

  useEffect(() => {
    (async () => {
      if (confirmDelete && aboutRemoved.id) {
        // Delete

        await api.delete(`/abouts/${aboutRemoved.id}`);

        setAbouts((state) =>
          state.filter((project) => project.id !== aboutRemoved.id),
        );

        toast(`"${aboutRemoved.title}" foi deletado com sucesso.`, {
          type: 'success',
        });

        setAboutRemoved({} as IAbout);
        setConfirmDelete(false);
        setModalActive(false);
      }
    })();
  }, [aboutRemoved, confirmDelete]);

  return (
    <Container>
      {loading && <Loading />}
      <Modal
        title={`Deletar ${aboutRemoved.title}`}
        description="Deseja realmente apagar essa informação?"
        active={modalActive}
        setProps={{ setConfirmDelete, setModalActive }}
      />

      <Content>
        <PageHeader title="Sobre mim">
          <div>
            <Button onClick={handleAbortPlus}>
              <FiPlus />
              <span>Adicionar</span>
            </Button>
            <ButtonLink to="/profile">
              <FiChevronLeft />
              <span>Voltar</span>
            </ButtonLink>
          </div>
        </PageHeader>
        <div className="about">
          {aboutPlus && (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input label="Título" name="title" />
              <Textarea label="Descrição" name="description" />
              <div>
                <Button type="submit">Enviar</Button>
              </div>
            </Form>
          )}

          <AboutContact>
            {abouts &&
              abouts.map((about) =>
                about.id === aboutEdit ? (
                  <Form key={about.id} ref={formRef} onSubmit={handleSubmit}>
                    <Input
                      label="Título"
                      name="title"
                      defaultValue={about.title}
                    />
                    <Textarea
                      label="Descrição"
                      name="description"
                      defaultValue={about.description}
                    />
                    <div>
                      <Button
                        bgColor="primary"
                        type="button"
                        onClick={handleAbort}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit">Concluir</Button>
                    </div>
                  </Form>
                ) : (
                  <div key={about.id} className="item">
                    <h2>{about.title}</h2>
                    <p>{about.description}</p>
                    <div>
                      <Button onClick={() => handleAboutEdit(about.id)}>
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(about)}
                        bgColor="secondary"
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                ),
              )}
          </AboutContact>
        </div>
      </Content>
    </Container>
  );
};

export default About;
