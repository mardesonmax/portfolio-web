import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 15px;
  max-width: 1200px;
  width: 100%;
  border-radius: 5px;

  .about {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0px;
  }

  form {
    flex: 1;
    margin-right: 7.5px;
    min-width: 350px;

    > div {
      display: flex;
      justify-content: flex-end;

      button {
        margin: 15px 0;
      }
    }
  }

  @media (max-width: 768px) {
    .about {
      form {
        margin-right: 0;
      }

      .item {
        margin-left: 0;
      }
    }
  }
`;

export const AboutContact = styled.div`
  flex: 1;
  min-width: 350px;

  .item {
    background: ${(props) => props.theme.container};
    box-shadow: ${(props) => props.theme.boxShadow};
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 5px;
    margin-left: 7.5px;

    color: ${(props) => props.theme.textDark};
  }
`;
