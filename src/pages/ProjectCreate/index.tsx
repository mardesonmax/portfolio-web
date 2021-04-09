import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FileWithPath } from 'react-dropzone';
import { useHistory } from 'react-router-dom';

import { FiChevronLeft } from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import UploadFile from '../../components/UploadFile';

import { Container, Content } from './styled';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import Checkbox from '../../components/Checkbox';
import ButtonLink from '../../components/ButtonLink';
import Loading from '../../components/Loading';

interface FormData {
  title: string;
  description: string;
  active: boolean;
}

interface File extends FileWithPath {
  url: string;
}

const ProjectCreate: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [previews, setPreviews] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const handleUploadFile = useCallback(
    async (filesData: FileWithPath[], proj_id: string) => {
      const data = new FormData();

      data.append('image', filesData[0]);
      data.append('proj_id', proj_id);

      await api.patch('/projects', data);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required('Título é obrigatório'),
          description: Yup.string().required('Descrição é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const project = await api.post('/projects', data);

        if (files.length > 0) {
          await handleUploadFile(files, project.data.id);
        }

        toast('Projeto cadastrado com sucesso.', {
          type: 'success',
        });
        setLoading(false);

        history.push('/projects');
      } catch (err) {
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        toast(
          'Erro ao tentar logar, verifique as credenciais e tente novamente.',
          {
            type: 'error',
          },
        );
      }
    },
    [files, handleUploadFile, history],
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
      {loading && <Loading />}
      <Content>
        <PageHeader title="Adicionar Projeto">
          <ButtonLink to="/projects">
            <FiChevronLeft />
            <span>Voltar</span>
          </ButtonLink>
        </PageHeader>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <UploadFile onUpload={onUpload} previews={previews} maxFiles={1} />

          <Input type="text" name="title" label="Título:" />
          <Input name="link_code" label="Código:" />
          <Input name="link_project" label="Projeto:" />
          <Textarea name="description" label="Descrição:" />

          <Checkbox
            value="false"
            name="status"
            title="Selecione para ativar o projeto"
          />

          <div className="submit-button">
            <Button type="submit">Concluir</Button>
          </div>
        </Form>
      </Content>
    </Container>
  );
};

export default ProjectCreate;
