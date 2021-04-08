import styled, { keyframes } from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

const animeTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Content = styled.div`
  margin: 15px;
  width: 100%;
  max-width: 700px;
  border-radius: 5px;

  form {
    animation: ${animeTop} 0.5s;

    margin-top: 15px;

    .submit-button {
      display: flex;
      justify-content: flex-end;

      button {
        width: auto;
        margin: 0;
        margin: 15px 0;
      }
    }
  }
`;

export const NotFound = styled.div`
  padding: 50px 10px;
  text-align: center;

  h1 {
    color: ${(props) => props.theme.error};
  }

  p {
    margin-top: 5px;
    color: ${(props) => props.theme.textDark};
  }
`;
