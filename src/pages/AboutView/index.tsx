import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import Loading from '../../components/Loading';

import { Container, Content, AboutContact, AboutProfile } from './styled';
import { Contact } from '../Contact';

import avatarSvg from '../../assets/avatar.svg';
import Progress from '../../components/Progress';
import Banner from '../../components/Banner';
import AboutContent from '../../components/AboutContent';
import ContactContent from '../../components/ContactContent';

interface IAbout {
  id: string;
  title: string;
  description: string;
}

const AboutView: React.FC = () => {
  const [abouts, setAbouts] = useState<IAbout[]>([]);
  const [contacts, setContacts] = useState<Contact>({} as Contact);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCanceled = false;
    (async () => {
      try {
        setLoading(true);
        const [responseAbouts, responseContacts] = await Promise.all([
          api.get('/abouts'),
          api.get('contacts'),
        ]);

        if (!isCanceled) {
          setAbouts(responseAbouts.data);
          setContacts(responseContacts.data);
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
      <Banner
        title="SOBRE MIM"
        subTitle="Olá, seja bem-vindo! Abaixo cotém algumas informações sobre mim."
      />
      <Container>
        {loading && <Loading />}

        <Content>
          <AboutProfile>
            {contacts.id && (
              <div className="profile">
                <div className="image">
                  <img src={avatarSvg} alt="Mardeson Pereira" />
                </div>

                <div className="contacts">
                  <h2>Contatos</h2>
                  <ContactContent contacts={contacts} />
                </div>

                <div className="skills">
                  <h2>Habilidades</h2>
                  <div>
                    <Progress value={75} skill="JavaScript" />
                    <Progress value={65} skill="ReactJs" />
                    <Progress value={65} skill="NodeJs" />
                    <Progress value={60} skill="Docker" />
                    <Progress value={70} skill="SQL" />
                    <Progress value={95} skill="HTML" />
                    <Progress value={90} skill="CSS" />
                  </div>
                </div>
              </div>
            )}

            <AboutContact>
              {abouts.length > 0 && (
                <div className="abouts">
                  {abouts.map((about) => (
                    <AboutContent key={about.id} about={about} />
                  ))}
                </div>
              )}
            </AboutContact>
          </AboutProfile>
        </Content>
      </Container>
    </>
  );
};

export default AboutView;
