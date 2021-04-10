import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiChevronLeft, FiFacebook, FiInstagram, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';

import { Container, Content } from './styled';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import api from '../../services/api';
import Loading from '../../components/Loading';
import LoadingSubmit from '../../components/LoadingSubmit';

interface Contact {
  id?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  email?: string;
  whatsapp?: string;
  github?: string;
  linkedin?: string;
}

const Contact: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [contact, setContact] = useState<Contact>({} as Contact);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await api.get('/contacts');

      setContact(response.data);
      setLoading(false);
    })();
  }, []);

  const handleSubmit = useCallback(async (data) => {
    try {
      setLoadingSubmit(true);
      const response = await api.post('/contacts', data);

      setContact(response.data);

      toast('Contatos salvos com sucesso.', {
        type: 'success',
      });
    } catch {
      toast('Algo saiu errado, tente novamente.', {
        type: 'error',
      });
    } finally {
      setLoadingSubmit(false);
    }
  }, []);

  return (
    <Container>
      {loading && <Loading />}
      <Content>
        <PageHeader title="Contatos">
          <ButtonLink to="/profile">
            <FiChevronLeft />
            <span>Voltar</span>
          </ButtonLink>
        </PageHeader>

        {contact.id && (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              icon={FiFacebook}
              name="facebook"
              placeholder="Facebook"
              defaultValue={contact.facebook}
            />
            <Input
              icon={FiInstagram}
              name="instagram"
              placeholder="Instagram"
              defaultValue={contact.instagram}
            />
            <Input
              icon={FaWhatsapp}
              name="whatsapp"
              placeholder="WhatsApp"
              defaultValue={contact.whatsapp}
            />
            <Input
              icon={FaGithub}
              name="github"
              placeholder="Github"
              defaultValue={contact.github}
            />
            <Input
              icon={FaLinkedin}
              name="linkedin"
              placeholder="Linkedin"
              defaultValue={contact.linkedin}
            />
            <Input
              icon={FiMail}
              name="email"
              placeholder="Email"
              defaultValue={contact.email}
            />
            <Input
              icon={FaTwitter}
              name="Twitter"
              placeholder="Twitter"
              defaultValue={contact.twitter}
            />
            <div>
              {loadingSubmit ? (
                <LoadingSubmit />
              ) : (
                <Button type="submit">Concluir</Button>
              )}
            </div>
          </Form>
        )}
      </Content>
    </Container>
  );
};

export default Contact;
