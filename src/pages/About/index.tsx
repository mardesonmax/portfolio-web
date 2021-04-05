import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import PageHeader from '../../components/PageHeader';

import { Container, Content, AboutContact } from './styled';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import Textarea from '../../components/Textarea';

const About: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  return (
    <Container>
      <Content>
        <PageHeader title="Sobre mim" />
        <div className="about">
          <Form ref={formRef} onSubmit={() => console.log('ok')}>
            <Input label="Título" name="title" />
            <Textarea label="Descrição" name="description" />
            <div>
              <Button>Concluir</Button>
            </div>
          </Form>

          <AboutContact>
            <div className="item">
              <h2>Titulo sobre mim</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>

            <div className="item">
              <h2>Titulo sobre mim</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>

            <div className="item">
              <h2>Titulo sobre mim</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>

            <div className="item">
              <h2>Titulo sobre mim</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>
          </AboutContact>
        </div>
      </Content>
    </Container>
  );
};

export default About;
