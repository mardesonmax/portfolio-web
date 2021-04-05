import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiLock, FiMail, FiTablet, FiUser } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';

import { Container, Content } from './styled';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import { useAuth } from '../../hooks/auth';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  return (
    <Container>
      <Content>
        <PageHeader title="Editar perfil">
          <div>
            <ButtonLink to="/profile/contact">
              <FiTablet /> Contatos
            </ButtonLink>

            <ButtonLink to="/profile/about">
              <FiUser /> Sobre mim
            </ButtonLink>
          </div>
        </PageHeader>
        <Form ref={formRef} onSubmit={() => console.log('ok')}>
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
            <Button>Concluir</Button>
          </div>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
