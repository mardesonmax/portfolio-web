import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import PageHeader from '../../components/PageHeader';
import { useAuth } from '../../hooks/auth';
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
  const { user } = useAuth();
  const [project, setProject] = useState<Project>({} as Project);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCanceled = false;
    (async () => {
      try {
        const response = await api.get(`/projects/${params.base_url}`, {
          params: user ? { admin: 'active' } : {},
        });

        if (!isCanceled) {
          setProject(response.data);
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
  }, [params, user]);

  return (
    <Container>
      {loading && <Loading />}
      <Content>
        {!project.id && !loading && (
          <NotFound
            title="Esta Página não está disponível"
            description="O link pode não esta funcionando ou o Projeto foi removido"
          />
        )}
        {project.id && (
          <ProjectContainer>
            <PageHeader title={project.title} />
            <div className="info">
              <h4>DATA</h4>
              <p>{formatDate(project.created_at)}</p>

              <h4>DESCRIÇÃO</h4>
              <p>{project.description}</p>

              {(project.link_code || project.link_project) && <h4>LINKS</h4>}

              {project.link_project && (
                <p>
                  <span>Site: </span>
                  <a
                    href={project.link_project}
                    target="_blank"
                    rel="noreferrer"
                  >
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
            {project.image && (
              <img src={project.image.url} alt={project.title} />
            )}
          </ProjectContainer>
        )}
      </Content>
    </Container>
  );
};

export default ProjectView;
