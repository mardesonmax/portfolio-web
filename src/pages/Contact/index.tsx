import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiFacebook, FiInstagram, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';

import { Container, Content } from './styled';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import Loading from '../../components/Loading';
import LoadingSubmit from '../../components/LoadingSubmit';
import ProfileMenu from '../../components/ProfileMenu';

export interface Contact {
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
    let isCanceled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await api.get('/contacts');

        if (!isCanceled) {
          setContact(response.data);
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
        <ProfileMenu />

        <div>
          <PageHeader title="Contatos" />

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
              name="twitter"
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
        </div>
      </Content>
    </Container>
  );
};

export default Contact;
