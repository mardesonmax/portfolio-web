import React, { useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Banner from '../../components/Banner';
import { Container, Content } from './styled';

import ContactContent, { Contact } from '../../components/ContactContent';
import api from '../../services/api';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

const Projects: React.FC = () => {
  const fromRef = useRef<FormHandles>(null);
  const [contacts, setContacts] = useState<Contact>({} as Contact);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCanceled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await api.get('contacts');

        if (!isCanceled) {
          setContacts(response.data);
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
  return (
    <>
      <Banner title="CONTATO" subTitle="Vamos bater um papo?" />
      <Container>
        {loading && <Loading />}
        <Content>
          {contacts.id && (
            <>
              <div className="contacts">
                <h2>Escolha a melhor opção</h2>
                <ContactContent contacts={contacts} />
              </div>

              <div className="form">
                <h2>
                  Se preferir preencha seus dados que entrarei em contato.
                </h2>
                <Form ref={fromRef} onSubmit={() => console.log('ok')}>
                  <Input name="name" label="Nome:" />
                  <Input type="email" name="email" label="E-mail:" />
                  <Input name="whatsapp" label="WhatsApp:" />
                  <Textarea name="subject" label="Assunto:" />

                  <div>
                    <Button type="submit">Enviar</Button>
                  </div>
                </Form>
              </div>
            </>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Projects;
