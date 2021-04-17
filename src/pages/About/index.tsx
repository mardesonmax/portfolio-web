import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';

import { Container, Content, AboutContact } from './styled';
import Button from '../../components/Button';

import api from '../../services/api';
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

  useEffect(() => {
    setAboutEdit('');
  }, [abouts]);

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

  const handleAboutPlus = useCallback(() => {
    setAboutPlus(true);
    setAboutEdit('');
  }, []);

  const handleAboutEdit = useCallback((id: string) => {
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
              <Button onClick={handleAboutPlus}>
                <FiPlus /> Adicionar
              </Button>
            </div>
          </PageHeader>

          {aboutPlus && (
            <AboutForm handleAbort={handleAbort} setAbouts={setAbouts} />
          )}

          <AboutContact>
            {abouts.length > 0 && (
              <div className="abouts">
                {abouts.map((about) =>
                  about.id === aboutEdit ? (
                    <AboutForm
                      key={about.id}
                      handleAbort={handleAbort}
                      setAbouts={setAbouts}
                      about={about}
                    />
                  ) : (
                    <AboutContent
                      key={about.id}
                      about={about}
                      handleDelete={handleDelete}
                      handleAboutEdit={handleAboutEdit}
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
