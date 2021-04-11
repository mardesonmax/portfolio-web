import styled, { keyframes } from 'styled-components';

const animeRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const animeLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 20px;
  width: 100%;
  max-width: 1200px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .contacts h2,
  .form h2 {
    color: ${(props) => props.theme.primary};
    margin-bottom: 10px;
  }

  .contacts {
    flex: 1;
    flex-basis: 350px;
    max-width: 400px;
    align-self: flex-start;
    background: ${(props) => props.theme.container};
    box-shadow: ${(props) => props.theme.boxShadow};
    margin-right: 20px;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 20px;
    animation: ${animeLeft} 1s ease;
  }

  .form {
    flex: 1;
    flex-basis: 450px;
    max-width: 800px;
    background: ${(props) => props.theme.container};
    box-shadow: ${(props) => props.theme.boxShadow};
    padding: 20px;
    border-radius: 5px;
    animation: ${animeRight} 1s ease;

    label {
      box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2);
      background: ${(props) => props.theme.background};
    }

    form {
      > div {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
    }
  }

  @media (max-width: 768px) {
    .contacts {
      margin-right: 0;
    }
  }
`;
