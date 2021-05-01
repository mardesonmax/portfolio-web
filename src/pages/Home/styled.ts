import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

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

const animeBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  top: 0;
  background: ${(props) => props.theme.background};
  position: absolute;
  z-index: 9999;
  overflow: hidden;

  .theme {
    position: absolute;
    top: 20px;
    right: 20px;
    button {
      font-size: 25px;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-left: 150px solid ${(props) => props.theme.primary};
    border-right: 150px solid transparent;
    border-bottom: 150px solid transparent;

    animation: ${animeTop} 0.5s ease;
    animation-delay: 1.5s;
    animation-fill-mode: backwards;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-left: 150px solid transparent;
    border-right: 150px solid ${(props) => props.theme.primary};
    border-top: 150px solid transparent;

    animation: ${animeBottom} 0.5s ease;
    animation-delay: 1.5s;
    animation-fill-mode: backwards;
  }

  @media (max-height: 768px) {
    &::before {
      border-left: 100px solid ${(props) => props.theme.primary};
      border-right: 100px solid transparent;
      border-bottom: 100px solid transparent;
    }

    &::after {
      border-left: 100px solid transparent;
      border-right: 100px solid ${(props) => props.theme.primary};
      border-top: 100px solid transparent;
    }
  }

  @media (max-height: 576px) {
    &::before,
    &::after {
      border: none;
    }
  }
`;
export const Content = styled.div`
  max-width: 1200px;
  width: 100%;

  .text {
    h1 {
      color: ${(props) => props.theme.primary};
      animation: ${animeLeft} 0.5s ease;
      animation-delay: 0.5s;
      animation-fill-mode: backwards;
    }

    h3 {
      color: ${(props) => props.theme.textDark};
      font-weight: lighter;
      animation: ${animeTop} 0.5s ease;
    }

    h1 + h3 {
      animation: ${animeBottom} 0.5s ease;
      animation-delay: 1s;
      animation-fill-mode: backwards;
    }
    font-size: 24px;
  }

  .menu {
    margin-top: 24px;
    display: flex;
    animation: ${animeLeft} 0.5s ease;
    animation-delay: 1.5s;
    animation-fill-mode: backwards;

    a {
      display: block;
      background: ${(props) => props.theme.primary};
      margin-right: 8px;
      margin-top: 8px;
      padding: 8px 10px;
      border-radius: 5px;
      font-size: 16px;
      text-decoration: none;
      color: ${(props) => props.theme.textLight};
      transition: 0.3s ease all;

      &:hover {
        background: ${(props) => shade(0.2, props.theme.primary)};
        box-shadow: ${(props) => props.theme.boxShadow};
      }
    }
  }

  .contacts {
    margin-top: 24px;
    display: flex;
    animation: ${animeRight} 0.5s ease;
    animation-delay: 1.5s;
    animation-fill-mode: backwards;

    a {
      margin-right: 8px;
    }
  }

  @media (max-width: 768px) {
    .text {
      font-size: 16px;
    }

    .menu {
      flex-wrap: wrap;
    }
  }
`;
