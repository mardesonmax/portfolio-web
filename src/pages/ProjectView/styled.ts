import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 15px;
  width: 100%;
  max-width: 1200px;
  border-radius: 5px;
`;

export const ProjectContainer = styled.div`
  animation: ${animeTop} 0.5s;
  .info {
    padding: 0 10px;
    overflow: hidden;

    h4 {
      margin-top: 15px;
      font-size: 12px;
      color: ${(props) => props.theme.default};
    }

    p {
      color: ${(props) => props.theme.textDark};
      margin-top: 4px;
      font-size: 15px;

      span {
        margin-right: 5px;
      }

      a {
        color: ${(props) => props.theme.primary};
        text-decoration: none;
        word-break: break-word;
        transition: 0.3s ease all;

        &:hover {
          color: ${(props) => shade(0.2, props.theme.primary)};
        }
      }
    }
  }

  img {
    width: 100%;
    object-fit: cover;
    margin-top: 15px;
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.boxShadow};
  }
`;
