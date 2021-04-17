import styled, { keyframes } from 'styled-components';

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

const anime = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 0 20px;
  width: 100%;
  max-width: 1200px;
  border-radius: 5px;
`;

export const AboutProfile = styled.div`
  display: flex;
  flex-wrap: wrap;

  .profile {
    animation: ${animeLeft} 1s ease;
    max-width: 350px;
    flex: 350px;
    margin: 20px 20px 0 0;
    padding: 15px;
    border-radius: 5px;
    background: ${(props) => props.theme.container};
    box-shadow: ${(props) => props.theme.boxShadow};
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .image {
      padding: 10px;
      background: ${(props) => props.theme.background};
      border-radius: 50%;
      max-width: 250px;
      max-height: 250px;

      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .contacts {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      animation: ${anime} 1s ease;

      h2 {
        margin: 20px 0;
        color: ${(props) => props.theme.primary};
        text-align: center;
      }
    }

    .skills {
      h2 {
        color: ${(props) => props.theme.primary};
        margin: 20px 0;
        text-align: center;
      }
      > div {
        margin-top: 10px;
        flex: 1;
        min-width: 200px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }
    }
  }

  @media (max-width: 768px) {
    .profile {
      flex: 100%;
      max-width: 100%;
      margin-right: 0;

      .image {
        max-width: 200px;
        max-height: 200px;
      }
    }
  }
`;

export const AboutContact = styled.div`
  flex: 1;
  align-self: flex-start;

  .abouts {
    margin-top: 20px;
    background: ${(props) => props.theme.container};
    box-shadow: ${(props) => props.theme.boxShadow};
    animation: ${animeRight} 1s ease;
    border-radius: 5px;
    padding: 10px;

    form {
      margin: 15px 0;
      padding: 15px;
      background: ${(props) => props.theme.background};
    }
  }
`;
