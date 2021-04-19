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
  width: 100%;
  max-width: 1200px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin: 20px;

  .contacts h2,
  .form h2 {
    color: ${(props) => props.theme.primary};
  }

  .contacts {
    flex: 1;
    flex-basis: 350px;
    background: ${(props) => props.theme.container};
    box-shadow: ${(props) => props.theme.boxShadow};
    margin-right: 20px;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    animation: ${animeLeft} 1s ease;
    display: flex;
    flex-direction: column;
    align-content: space-between;

    > div {
      flex: 1;
      h2 {
        margin-bottom: 30px;
      }
    }

    img {
      width: 100%;
      margin-top: 15px;
    }
  }

  .form {
    flex: 1;
    flex-basis: 364px;
    background: ${(props) => props.theme.container};
    box-shadow: ${(props) => props.theme.boxShadow};
    border-radius: 5px;
    animation: ${animeRight} 1s ease;

    h2 {
      padding: 0 20px;
      margin-top: 10px;
    }

    label {
      box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.13);
      background: ${(props) => props.theme.background};
    }

    form {
      margin: 20px;

      > div {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    .contacts {
      margin: 0;
      margin-bottom: 20px;
    }
  }
`;
