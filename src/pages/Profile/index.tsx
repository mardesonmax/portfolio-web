import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import {
  FiInfo,
  FiLock,
  FiMail,
  FiPower,
  FiTablet,
  FiUser,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';

import { Container, Content } from './styled';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const Profile: React.FC = () => {
  const { user, updateUser, signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data) => {
      const response = await api.post('/users', data);

      updateUser(response.data);

      toast('Perfil atualizado com sucesso.', {
        type: 'success',
      });
    },
    [updateUser],
  );

  return (
    <Container>
      <Content>
        <PageHeader title="Perfil">
          <div>
            <ButtonLink to="/profile/contact">
              <FiTablet /> <span>Contatos</span>
            </ButtonLink>

            <ButtonLink to="/profile/about">
              <FiInfo /> <span>Sobre mim</span>
            </ButtonLink>

            <Button bgColor="secondary" onClick={() => signOut()}>
              <FiPower /> <span>Sair</span>
            </Button>
          </div>
        </PageHeader>

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
            placeholder="Senha"
          />
          <div>
            <Button type="submit">Concluir</Button>
          </div>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
