import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FileWithPath } from 'react-dropzone';
import { useHistory, useParams } from 'react-router-dom';

import { FiChevronLeft } from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import UploadFile from '../../components/UploadFile';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import Checkbox from '../../components/Checkbox';
import ButtonLink from '../../components/ButtonLink';
import { Container, Content, NotFound } from './styled';
import Loading from '../../components/Loading';

interface FormData {
  title: string;
  description: string;
  active: boolean;
}

interface File extends FileWithPath {
  url: string;
}

interface Params {
  base_url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  link_code?: string;
  link_project?: string;
  base_url: string;
  status: boolean;
  image?: {
    id: string;
    url: string;
  };
}

const ProjectUpdate: React.FC = () => {
  const params = useParams<Params>();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [previews, setPreviews] = useState<File[]>([]);
  const [project, setProject] = useState<Project>({} as Project);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/projects/${params.base_url}?admin=active`,
        );

        if (response.data.image) {
          setPreviews([response.data.image]);
        }

        setProject(response.data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    })();
    window.scrollTo(0, 0);
  }, [params]);

  const handleUploadFile = useCallback(
    async (filesData: FileWithPath[], proj_id: string) => {
      const data = new FormData();

      data.append('image', filesData[0]);
      data.append('proj_id', proj_id);

      const response = await api.patch('/projects', data);

      setProject((state) => ({ ...state, image: response.data }));
      setPreviews([response.data]);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required('Título é obrigatório'),
          description: Yup.string().required('Descrição é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const upProject = await api.post(`/projects/${project.id}`, data);

        if (files.length > 0) {
          handleUploadFile(files, project.id);
        }

        setProject(upProject.data);

        toast('Projeto atualizado com sucesso.', {
          type: 'success',
        });

        if (project.title !== upProject.data.title) {
          history.push(`/projects/edit/${upProject.data.base_url}`);
          return;
        }
        window.scrollTo(0, 0);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        toast('Erro ao tentar atualizar informações do projeto!', {
          type: 'error',
        });
      }
    },
    [files, handleUploadFile, project, history],
  );

  const onUpload = useCallback(
    (filesData: FileWithPath[]): void => {
      setPreviews(
        filesData.map((file) =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
          }),
        ),
      );

      setFiles(filesData);
    },
    [setPreviews],
  );

  return (
    <Container>
      <Content>
        <PageHeader title="Editar Projeto">
          <ButtonLink to="/projects">
            <FiChevronLeft />
            <span>Voltar</span>
          </ButtonLink>
        </PageHeader>

        {project.id ? (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <UploadFile onUpload={onUpload} previews={previews} maxFiles={1} />

            <Input
              type="text"
              name="title"
              label="Título:"
              defaultValue={project.title}
            />
            <Input
              name="link_code"
              label="Código:"
              defaultValue={project.link_code}
            />
            <Input
              name="link_project:"
              label="Projecto"
              defaultValue={project.link_project}
            />
            <Textarea
              label="Descrição:"
              name="description"
              defaultValue={project.description}
            />

            <Checkbox
              defaultChecked={project.status}
              name="status"
              title="Selecione para ativar o projeto"
            />

            <div className="submit-button">
              <Button type="submit">Concluir</Button>
            </div>
          </Form>
        ) : (
          !loading && (
            <NotFound>
              <h1>Esta Página não está disponível</h1>
              <p>O link pode não esta funcionando ou o Projeto foi removido</p>
            </NotFound>
          )
        )}

        {loading && <Loading />}
      </Content>
    </Container>
  );
};

export default ProjectUpdate;
