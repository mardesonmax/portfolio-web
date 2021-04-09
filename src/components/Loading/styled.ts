import { transparentize } from 'polished';
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
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  position: fixed;
  z-index: 9999;
  background: ${(props) => transparentize(0.0, props.theme.background)};
  top: 0;
  margin-top: 100px;
  width: 64px;
  height: 64px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease all;
  animation: ${animeTop} 0.5s;

  .loading {
    display: inline-block;
    position: relative;
    width: 60px;
    height: 60px;

    > div {
      display: flex;
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 50px;
      height: 50px;
      margin: 5px;
      border: 8px solid ${(props) => props.theme.primary};
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
