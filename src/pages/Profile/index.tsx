import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiEdit, FiLock, FiMail, FiUser, FiX } from 'react-icons/fi';
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

interface UserParams {
  name: string;
  email: string;
  new_password?: string;
  confirm_password?: string;
  old_password?: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [newPassword, setNewPassword] = useState(false);

  const handleSubmit = useCallback(
    async (data: UserParams) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().email('Email inválido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        let response;

        setLoadingSubmit(true);

        if (
          data.new_password ||
          data.confirm_password ||
          data.old_password ||
          newPassword
        ) {
          const passwordSchema = Yup.object().shape({
            old_password: Yup.string().required('Senha atual obrigatória'),
            new_password: Yup.string().required('Nova senha obrigatória'),
            confirm_new_password: Yup.string().oneOf(
              [Yup.ref('new_password')],
              'Senha não corresponde',
            ),
          });

          await passwordSchema.validate(data, {
            abortEarly: false,
          });

          response = await api.post('/users', data);
          setNewPassword(false);
        } else {
          response = await api.post('/users', {
            name: data.name,
            email: data.email,
          });
        }

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
    [updateUser, newPassword],
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
            <div className="new-password">
              <div className="title-button">
                <p>Trocar a senha</p>
                <Button
                  type="button"
                  onClick={() => setNewPassword(!newPassword)}
                >
                  {newPassword ? (
                    <>
                      <FiX />
                      <span>fechar</span>
                    </>
                  ) : (
                    <>
                      <FiEdit />
                      <span>editar</span>
                    </>
                  )}
                </Button>
              </div>

              {newPassword && (
                <div>
                  <Input
                    icon={FiLock}
                    type="password"
                    name="old_password"
                    placeholder="Atual"
                  />
                  <Input
                    icon={FiLock}
                    type="password"
                    name="new_password"
                    placeholder="Nova"
                  />
                  <Input
                    icon={FiLock}
                    type="password"
                    name="confirm_new_password"
                    placeholder="Digite novamente"
                  />
                </div>
              )}
            </div>

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
