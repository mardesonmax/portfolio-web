import styled, { keyframes } from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

const animeLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const animeRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(50px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Content = styled.div`
  margin: 15px;
  width: 100%;
  max-width: 700px;
  border-radius: 5px;

  .about {
    display: flex;
    flex-direction: column;
    padding: 15px 0;
  }

  form {
    animation: ${animeLeft} 0.5s;

    > div {
      display: flex;
      justify-content: flex-end;

      button {
        margin: 15px 0;
      }
    }
  }
`;

export const AboutContact = styled.div`
  form {
    border: 2px solid ${(props) => props.theme.primary};
    border-radius: 5px;
    margin-bottom: 15px;

    label {
      margin: 15px;
      width: auto;
    }

    padding-right: 0;
    > div {
      justify-content: space-between;
      padding: 0 15px;
    }
  }

  .item {
    animation: ${animeRight} 0.5s;
    background: ${(props) => props.theme.container};
    box-shadow: ${(props) => props.theme.boxShadow};
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 5px;
    color: ${(props) => props.theme.textDark};
    position: relative;
    overflow: hidden;

    > div {
      display: flex;
      width: 100%;
      left: 0;
      top: 0;
      bottom: 0;
      padding: 15px;
      position: absolute;
      justify-content: space-around;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      transition: 0.3s ease all;
      backdrop-filter: blur(3px);

      > div {
        margin: 0 5px;
      }
    }

    &:hover {
      > div {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  @media (max-width: 768px) {
    padding-left: 0;
    flex: 100%;
  }
`;
