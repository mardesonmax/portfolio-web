import styled, { keyframes } from 'styled-components';

const animeRotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const animeTop = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease all;
  animation: ${animeTop} 0.5s;

  .loading {
    display: flex;
    position: relative;
    width: 25px;
    height: 25px;

    > div {
      display: flex;
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid ${(props) => props.theme.primary};
      border-radius: 50%;
      animation: ${animeRotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: ${(props) => props.theme.primary} transparent transparent
        transparent;
    }

    & div:nth-child(1) {
      animation-delay: -0.45s;
    }
    & div:nth-child(2) {
      animation-delay: -0.3s;
    }
    & div:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;
