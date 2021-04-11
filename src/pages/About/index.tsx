import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';

import { Container, Content, AboutContact } from './styled';
import Button from '../../components/Button';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import ProfileMenu from '../../components/ProfileMenu';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import AboutContent from '../../components/AboutContent';
import AboutForm from '../../components/AboutForm';

interface IAbout {
  id: string;
  title: string;
  description: string;
}

const About: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [aboutPlus, setAboutPlus] = useState(false);
  const [abouts, setAbouts] = useState<IAbout[]>([]);
  const [aboutRemoved, setAboutRemoved] = useState<IAbout>({} as IAbout);
  const [modalActive, setModalActive] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [aboutEdit, setAboutEdit] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCanceled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await api.get('/abouts');

        if (!isCanceled) {
          setAbouts(response.data);
          setLoading(false);
        }
      } catch {
        if (!isCanceled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isCanceled = true;
    };
  }, [setAbouts]);

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
      } finally {
        setLoadingSubmit(false);
      }
    },
    [aboutEdit],
  );

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

  const handleDelete = useCallback(
    (about: IAbout) => {
      setAboutRemoved(about);
      setModalActive(true);
    },
    [setAboutRemoved, setModalActive],
  );

  const handleAbort = useCallback(() => {
    setAboutPlus(false);
    setAboutEdit('');
  }, []);

  const handleAbortPlus = useCallback(() => {
    setAboutPlus(true);
    setAboutEdit('');
  }, []);

  const handleAbortEdit = useCallback((id: string) => {
    setAboutEdit(id);
    setAboutPlus(false);
  }, []);

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
        <ProfileMenu />
        <div>
          <PageHeader title="Sobre mim">
            <div>
              <Button onClick={handleAbortPlus}>
                <FiPlus /> Adicionar
              </Button>
            </div>
          </PageHeader>

          {aboutPlus && (
            <AboutForm
              handleAbort={handleAbort}
              handleSubmit={handleSubmit}
              loadingSubmit={loadingSubmit}
            />
          )}

          <AboutContact>
            {abouts.length > 0 && (
              <div className="abouts">
                {abouts.map((about) =>
                  about.id === aboutEdit ? (
                    <AboutForm
                      key={about.id}
                      handleAbort={handleAbort}
                      handleSubmit={handleSubmit}
                      loadingSubmit={loadingSubmit}
                      about={about}
                    />
                  ) : (
                    <AboutContent
                      key={about.id}
                      about={about}
                      handleDelete={handleDelete}
                      handleAboutEdit={handleAbortEdit}
                    />
                  ),
                )}
              </div>
            )}
          </AboutContact>
        </div>
      </Content>
    </Container>
  );
};

export default About;
