import React, { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';

import { toast } from 'react-toastify';
import ButtonLink from '../../components/ButtonLink';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import PageHeader from '../../components/PageHeader';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container, Content } from './styled';

import ProjectItem, { IProject } from '../../components/ProjectItem';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectRemoved, setProjectRemoved] = useState<IProject>(
    {} as IProject,
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = user
        ? await api.get('/projects?admin=active')
        : await api.get('/projects');
      setProjects(response.data);
      setLoading(false);
    })();
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
    <Container>
      {loading && <Loading />}
      <Content>
        <Modal
          title={`Deletar ${projectRemoved.title}`}
          description="Deseja realmente apagar esse projeto?"
          active={modalActive}
          setProps={{ setConfirmDelete, setModalActive }}
        />
        <PageHeader title="Projetos">
          {user && (
            <ButtonLink bgColor="primary" to="/projects/create">
              <FiSend />
              <span>Novo Projeto</span>
            </ButtonLink>
          )}
        </PageHeader>

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
  );
};

export default Projects;
