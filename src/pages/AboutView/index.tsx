import React, { useEffect, useState } from 'react';

import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';

import api from '../../services/api';
import Loading from '../../components/Loading';

import { Container, Content, AboutContact, AboutProfile } from './styled';

import ProfileJPEG from '../../assets/profile.jpeg';
import Progress from '../../components/Progress';
import Banner from '../../components/Banner';
import AboutContent from '../../components/AboutContent';

interface IAbout {
  id: string;
  title: string;
  description: string;
}

const AboutView: React.FC = () => {
  const [abouts, setAbouts] = useState<IAbout[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCanceled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await api.get('/abouts');

        if (!isCanceled) {
          setAbouts(response.data);
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
        subTitle="Olá seja bem-vindo, abaixo tem algumas informações sobre mim."
      />
      <Container>
        {loading && <Loading />}

        <Content>
          <AboutProfile>
            <div className="profile">
              <div className="image">
                <img src={ProfileJPEG} alt="Mardeson Pereira" />
              </div>

              <div className="contacts">
                <h2>Contatos</h2>
                <div>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <span>
                      <FaFacebook />
                    </span>
                  </a>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <span>
                      <FaInstagram />
                    </span>
                  </a>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <span>
                      <FaWhatsapp />
                    </span>
                  </a>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <span>
                      <FaLinkedin />
                    </span>
                  </a>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <span>
                      <FaGithub />
                    </span>
                  </a>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <span>
                      <FaTwitter />
                    </span>
                  </a>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <span>
                      <FaEnvelope />
                    </span>
                  </a>
                </div>
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
