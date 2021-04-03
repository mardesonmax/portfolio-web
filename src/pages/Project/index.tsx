import React from 'react';
import { FiSend } from 'react-icons/fi';
import ButtonLink from '../../components/ButtonLink';
import PageHeader from '../../components/PageHeader';

import { Container, Content } from './styled';

const Project: React.FC = () => {
  return (
    <Container>
      <Content>
        <PageHeader title="Projetos">
          <ButtonLink to="/project/new">
            <FiSend />
            Novo Projeto
          </ButtonLink>
        </PageHeader>

        <div className="project-container">
          <div className="project-item">
            <div className="col-1">
              <img src="assets/project_01.png" alt="Projeto" />
            </div>

            <div className="col-2">
              <div className="info">
                <h3>Lorem Ipsum is simply dummy text</h3>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived.
                </p>
              </div>
            </div>
          </div>

          <div className="project-item left-position">
            <div className="col-1">
              <img src="assets/project_02.png" alt="Projeto" />
            </div>

            <div className="col-2">
              <div className="info">
                <h3>Lorem Ipsum is simply dummy text</h3>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived.
                </p>
              </div>
            </div>
          </div>

          <div className="project-item">
            <div className="col-1">
              <img src="assets/project_01.png" alt="Projeto" />
            </div>

            <div className="col-2">
              <div className="info">
                <h3>Lorem Ipsum is simply dummy text</h3>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived.
                </p>
              </div>
            </div>
          </div>

          <div className="project-item left-position">
            <div className="col-1">
              <img src="assets/project_02.png" alt="Projeto" />
            </div>

            <div className="col-2 ">
              <div className="info">
                <h3>Lorem Ipsum is simply dummy text</h3>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default Project;
