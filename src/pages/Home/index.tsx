import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonTheme from '../../components/ButtonTheme';
import ContactContent from '../../components/ContactContent';
import api from '../../services/api';

import { Container, Content } from './styled';

export interface Contact {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  email?: string;
  whatsapp?: string;
  github?: string;
  linkedin?: string;
}

const Home: React.FC = () => {
  const [contacts, setContacts] = useState<Contact>({} as Contact);

  useEffect(() => {
    let isCanceled = false;
    (async () => {
      try {
        // setLoading(true);
        const response = await api.get('/contacts');

        if (!isCanceled) {
          setContacts(response.data);
          // setLoading(false);
        }
      } catch {
        if (!isCanceled) {
          // setLoading(false);
        }
      }
    })();

    return () => {
      isCanceled = true;
    };
  }, []);

  return (
    <Container>
      <div className="theme">
        <ButtonTheme />
      </div>

      <Content>
        <div className="text">
          <h3>Olá, eu me chamo</h3>
          <h1>Mardeson Pereira</h1>
          <h3>Sou programador JavaScript Front-end e Back-end</h3>
        </div>

        <div className="menu">
          <Link to="/projects">Portfólio</Link>
          <Link to="/about">Sobre mim</Link>
          <Link to="/projects">Contato</Link>
        </div>

        <div className="contacts">
          <ContactContent contacts={contacts} />
        </div>
      </Content>
    </Container>
  );
};

export default Home;
