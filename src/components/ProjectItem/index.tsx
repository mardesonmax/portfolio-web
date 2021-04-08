import React, { useCallback } from 'react';
import { FaHandPointRight } from 'react-icons/fa';

import { FiEdit, FiMoreHorizontal, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Button from '../Button';
import ButtonLink from '../ButtonLink';
import { ProjectContent } from './styled';
import formatDate from '../../utils/formatDate';

export interface IProject {
  id: string;
  title: string;
  description: string;
  link_code?: string;
  link_project?: string;
  base_url: string;
  status: boolean;
  created_at: Date;
  image: {
    id: string;
    url: string;
  } | null;
}

interface Props {
  project: IProject;
  user: boolean;
  index: number;
  setProjectRemoved(project: IProject): void;
  setModalActive(active: boolean): void;
}

const ProjectItem: React.FC<Props> = ({
  project,
  user,
  index,
  setProjectRemoved,
  setModalActive,
}) => {
  const handleDelete = useCallback(
    (item: IProject) => {
      setProjectRemoved(item);
      setModalActive(true);
    },
    [setProjectRemoved, setModalActive],
  );

  return (
    <ProjectContent>
      <Link
        to={`/projects/view/${project.base_url}`}
        className={`project-item ${index % 2 === 1 ? 'left-position' : ''} ${
          !project.status ? 'disabled' : ''
        }`}
      >
        <div className="col-1">
          {project.image && <img src={project.image.url} alt={project.title} />}
        </div>

        <div className="col-2 ">
          <div className="info">
            <h2>{project.title}</h2>
            <small>Publicando em {formatDate(project.created_at)}</small>

            <p>{project.description}</p>

            <span>
              <FaHandPointRight /> Visualizar
            </span>
          </div>
        </div>
      </Link>

      {user && (
        <div className="configs">
          <div className="button-config">
            <div>
              <ButtonLink
                bgColor={index % 2 === 1 ? 'default' : 'primary'}
                to={`/projects/edit/${project.base_url}`}
              >
                <FiEdit />
                Editar Projeto
              </ButtonLink>

              <Button onClick={() => handleDelete(project)} bgColor="secondary">
                <FiTrash />
                Excluir
              </Button>
            </div>

            <FiMoreHorizontal />
          </div>
        </div>
      )}
    </ProjectContent>
  );
};

export default ProjectItem;
