import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiFacebook, FiInstagram, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';

import { Container, Content } from './styled';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const Contact: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  return (
    <Container>
      <Content>
        <PageHeader title="Contatos" />
        <Form ref={formRef} onSubmit={() => console.log('ok')}>
          <Input icon={FiFacebook} name="facebook" placeholder="Facebook" />
          <Input icon={FiInstagram} name="instagram" placeholder="Instagram" />
          <Input icon={FaWhatsapp} name="whatsapp" placeholder="WhatsApp" />
          <Input icon={FaGithub} name="github" placeholder="Github" />
          <Input icon={FaLinkedin} name="linkedin" placeholder="Linkedin" />
          <Input icon={FiMail} name="email" placeholder="Email" />
          <Input icon={FaTwitter} name="Twitter" placeholder="Twitter" />
          <div>
            <Button>Concluir</Button>
          </div>
        </Form>
      </Content>
    </Container>
  );
};

export default Contact;
