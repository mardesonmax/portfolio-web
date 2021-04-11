import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';

import { Container, Content } from './styled';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import LoadingSubmit from '../../components/LoadingSubmit';
import getValidationErrors from '../../utils/getValidationErrors';
import ProfileMenu from '../../components/ProfileMenu';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().email('Email inválido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoadingSubmit(true);
        const response = await api.post('/users', data);

        updateUser(response.data);

        toast('Perfil atualizado com sucesso.', {
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        toast('Algo saiu errado, tente novamente.', {
          type: 'error',
        });
      } finally {
        setLoadingSubmit(false);
      }
    },
    [updateUser],
  );

  return (
    <Container>
      <Content>
        <ProfileMenu />
        <div>
          <PageHeader title="Perfil" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              icon={FiUser}
              name="name"
              placeholder="Nome"
              defaultValue={user.name}
            />
            <Input
              icon={FiMail}
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={user.email}
            />
            <Input
              icon={FiLock}
              type="password"
              name="password"
              placeholder="Nova senha"
            />
            <div>
              {loadingSubmit ? (
                <LoadingSubmit />
              ) : (
                <Button type="submit">Concluir</Button>
              )}
            </div>
          </Form>
        </div>
      </Content>
    </Container>
  );
};

export default Profile;
