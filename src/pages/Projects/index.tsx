import React, { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';

import { toast } from 'react-toastify';
import ButtonLink from '../../components/ButtonLink';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container, Content } from './styled';

import ProjectItem, { IProject } from '../../components/ProjectItem';
import Banner from '../../components/Banner';

const Projects: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectRemoved, setProjectRemoved] = useState<IProject>(
    {} as IProject,
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCanceled = false;
    (async () => {
      setLoading(true);
      const response = await api.get('/projects', {
        params: user ? { admin: 'active' } : {},
      });
      if (!isCanceled) {
        setProjects(response.data);
        setLoading(false);
      }
    })();

    return () => {
      isCanceled = true;
    };
  }, [user]);

  useEffect(() => {
    (async () => {
      if (confirmDelete && projectRemoved.id) {
        // Delete

        await api.delete(`/projects/${projectRemoved.id}`);

        setProjects((state) =>
          state.filter((project) => project.id !== projectRemoved.id),
        );

        toast(`Projeto "${projectRemoved.title}" foi deletado com sucesso.`, {
          type: 'success',
        });

        setProjectRemoved({} as IProject);
        setConfirmDelete(false);
        setModalActive(false);
      }
    })();
  }, [confirmDelete, projectRemoved]);

  return (
    <>
      <Banner
        title="PORTFÓLIO"
        subTitle="Abaixo estão alguns dos meus projetos."
      />
      <Container>
        {loading && <Loading />}

        <Content>
          <Modal
            title={`Deletar ${projectRemoved.title}`}
            description="Deseja realmente apagar esse projeto?"
            active={modalActive}
            setProps={{ setConfirmDelete, setModalActive }}
          />

          {user && (
            <div className="add-project">
              <ButtonLink bgColor="primary" to="/projects/create">
                <FiSend />
                <span>Novo Projeto</span>
              </ButtonLink>
            </div>
          )}

          {projects && (
            <div>
              {projects.map((project, index) => (
                <ProjectItem
                  user={!!user}
                  key={project.id}
                  index={index}
                  project={project}
                  setModalActive={setModalActive}
                  setProjectRemoved={setProjectRemoved}
                />
              ))}
            </div>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Projects;
