import styled, { keyframes } from 'styled-components';

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

const animeTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
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
  animation: ${animeTop} 1s ease;

  .profile {
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

      h2 {
        margin-top: 10px;
        color: ${(props) => props.theme.primary};
        text-align: center;
      }

      > div {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        min-width: 200px;

        a {
          margin: 5px;
          span {
            display: flex;
            font-size: 20px;
            border: 5px solid ${(props) => props.theme.container};
            color: ${(props) => props.theme.primary};
            background: ${(props) => props.theme.background};
            justify-content: center;
            align-items: center;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            transition: 0.3s ease all;
          }

          &:hover {
            span {
              border-color: ${(props) => props.theme.background};
              color: ${(props) => props.theme.textLight};
              background: ${(props) => props.theme.primary};
            }
          }
        }
      }
    }

    .skills {
      h2 {
        color: ${(props) => props.theme.primary};
        margin-top: 10px;
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

  .new {
    margin-top: 15px;
  }

  form {
    animation: ${animeLeft} 0.5s;
    border-radius: 5px;
    margin: 15px 0;

    label {
      width: auto;
    }

    > div {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }
  }

  .abouts {
    margin-top: 20px;
    background: ${(props) => props.theme.container};
    box-shadow: ${(props) => props.theme.boxShadow};
    animation: ${animeTop} 1s ease;
    border-radius: 5px;
    padding: 10px;

    form {
      margin: 15px 0;
      padding: 15px;
      background: ${(props) => props.theme.background};
    }
  }

  @media (max-width: 768px) {
  }
`;
