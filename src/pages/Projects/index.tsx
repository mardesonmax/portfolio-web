import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit, FiSend } from 'react-icons/fi';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import Modal from '../../components/Modal';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import { Container, Content } from './styled';

interface Project {
  id: string;
  title: string;
  description: string;
  link_code?: string;
  link_project?: string;
  base_url: string;
  status: boolean;
  image: {
    id: string;
    url: string;
  } | null;
}
const Project: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectRemoved, setProjectRemoved] = useState<Project>({} as Project);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await api.get('/projects');
      setProjects(response.data);
    })();
  }, []);

  useEffect(() => {
    if (confirmDelete) {
      // Delete
      console.log(`Já era ${projectRemoved}`);

      setProjects((state) =>
        state.filter((project) => project.id !== projectRemoved.id),
      );

      setProjectRemoved({} as Project);
      setConfirmDelete(false);
      setModalActive(false);
    }
  }, [confirmDelete, projectRemoved]);

  const handleDelete = useCallback((project: Project) => {
    setProjectRemoved(project);
    setModalActive(true);
  }, []);

  return (
    <Container>
      <Content>
        <Modal
          title={`Deletar ${projectRemoved.title}`}
          description="Deseja realmente apagar esse projeto?"
          active={modalActive}
          setProps={{ setConfirmDelete, setModalActive }}
        />
        <PageHeader title="Projetos">
          <ButtonLink bgColor="primary" to="/projects/create">
            <FiSend />
            Novo Projeto
          </ButtonLink>
        </PageHeader>

        <div className="project-container">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-item ${
                index % 2 === 1 ? 'left-position' : ''
              } ${!project.status ? 'disabled' : ''}`}
            >
              <div className="col-1">
                {project.image && (
                  <img src={project.image.url} alt={project.title} />
                )}
              </div>

              <div className="col-2 ">
                <div className="info">
                  <h2>{project.title}</h2>

                  <p>{project.description}</p>
                </div>
                <div className="configs">
                  <ButtonLink
                    bgColor={index % 2 === 1 ? 'default' : 'primary'}
                    to={`/projects/${project.base_url}/edit`}
                  >
                    <FiEdit />
                    Editar Projeto
                  </ButtonLink>

                  <Button
                    onClick={() => handleDelete(project)}
                    bgColor="secondary"
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Content>
    </Container>
  );
};

export default Project;
