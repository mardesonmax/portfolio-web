import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiPlus } from 'react-icons/fi';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import { useAuth } from '../../hooks/auth';

import { Container, Content, AboutContact, AboutProfile } from './styled';

import ProfileJPEG from '../../assets/profile.jpeg';
import Progress from '../../components/Progress';
import LoadingSubmit from '../../components/LoadingSubmit';

interface IAbout {
  id: string;
  title: string;
  description: string;
}

const About: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [abouts, setAbouts] = useState<IAbout[]>([]);
  const [aboutEdit, setAboutEdit] = useState('');
  const [aboutPlus, setAboutPlus] = useState(false);
  const [aboutRemoved, setAboutRemoved] = useState<IAbout>({} as IAbout);
  const [modalActive, setModalActive] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
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
        <PageHeader title="Sobre mim" />

        <AboutProfile>
          <div className="profile">
            <div className="image">
              <img src={ProfileJPEG} alt="Mardeson Pereira" />
            </div>

            <div className="contacts">
              <h2>Contatos</h2>
              <div>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <span>
                    <FaFacebook />
                  </span>
                </a>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <span>
                    <FaInstagram />
                  </span>
                </a>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <span>
                    <FaWhatsapp />
                  </span>
                </a>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <span>
                    <FaLinkedin />
                  </span>
                </a>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <span>
                    <FaGithub />
                  </span>
                </a>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <span>
                    <FaTwitter />
                  </span>
                </a>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <span>
                    <FaEnvelope />
                  </span>
                </a>
              </div>
            </div>

            <div className="skills">
              <h2>Habilidades</h2>
              <div>
                <Progress value={75} skill="JavaScript" />
                <Progress value={65} skill="ReactJs" />
                <Progress value={65} skill="NodeJs" />
                <Progress value={60} skill="Docker" />
                <Progress value={70} skill="SQL" />
                <Progress value={95} skill="HTML" />
                <Progress value={90} skill="CSS" />
              </div>
            </div>
          </div>

          <AboutContact>
            {aboutPlus ? (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input label="Título" name="title" />
                <Textarea label="Descrição" name="description" />
                <div>
                  <Button
                    type="button"
                    bgColor="primary"
                    onClick={() => setAboutPlus(false)}
                  >
                    Cancelar
                  </Button>

                  {loadingSubmit ? (
                    <LoadingSubmit />
                  ) : (
                    <Button type="submit">Enviar</Button>
                  )}
                </div>
              </Form>
            ) : (
              user && (
                <div className="new">
                  <Button onClick={handleAbortPlus}>
                    <FiPlus />
                    <span>Adicionar</span>
                  </Button>
                </div>
              )
            )}

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
                      {loadingSubmit ? (
                        <LoadingSubmit />
                      ) : (
                        <Button type="submit">Concluir</Button>
                      )}
                    </div>
                  </Form>
                ) : (
                  <div key={about.id} className="item">
                    <h2>{about.title}</h2>
                    <p>{about.description}</p>

                    {user && (
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
                    )}
                  </div>
                ),
              )}
          </AboutContact>
        </AboutProfile>
      </Content>
    </Container>
  );
};

export default About;
