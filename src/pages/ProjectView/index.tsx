import React, { useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import ButtonLink from '../../components/ButtonLink';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';
import formatDate from '../../utils/formatDate';

import { Container, Content, ProjectContainer } from './styled';

interface Project {
  id: string;
  title: string;
  description: string;
  link_code?: string;
  link_project?: string;
  base_url: string;
  status: boolean;
  created_at: Date;
  image?: {
    id: string;
    url: string;
  };
}

interface Params {
  base_url: string;
}

const ProjectView: React.FC = () => {
  const params = useParams<Params>();
  const [project, setProject] = useState<Project>({} as Project);

  useEffect(() => {
    (async () => {
      const response = await api.get(`/projects/${params.base_url}`);
      setProject(response.data);
    })();
  }, [params]);

  return (
    <Container>
      <Content>
        <PageHeader title={project.title}>
          <ButtonLink to="/projects">
            <FiChevronLeft />
            <span>Voltar</span>
          </ButtonLink>
        </PageHeader>

        <ProjectContainer>
          <div className="info">
            <h4>DATA</h4>
            <p>{formatDate(project.created_at)}</p>

            <h4>DESCRIÇÃO</h4>
            <p>{project.description}</p>

            {(project.link_code || project.link_project) && <h4>LINKS</h4>}

            {project.link_project && (
              <p>
                <span>Site: </span>
                <a href={project.link_project} target="_blank" rel="noreferrer">
                  {project.link_project}
                </a>
              </p>
            )}

            {project.link_code && (
              <p>
                <span>Repositório: </span>
                <a href={project.link_code} target="_blank" rel="noreferrer">
                  {project.link_code}
                </a>
              </p>
            )}
          </div>
          {project.image && <img src={project.image.url} alt={project.title} />}
        </ProjectContainer>
      </Content>
    </Container>
  );
};

export default ProjectView;
