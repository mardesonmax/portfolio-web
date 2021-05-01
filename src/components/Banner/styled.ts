import styled, { css, keyframes } from 'styled-components';
import { shade, transparentize } from 'polished';

const animate = keyframes`
  0% {
    width: 100%;
  }

  100% {
    width: 30%;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: ${(props) => props.theme.banner};
  height: 40vh;
  max-height: 400px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 30%;
    height: 100%;
    background: ${(props) => shade(0.1, props.theme.banner)};
    animation: ${animate} 1s ease;

    ${(props) => css`
      background: linear-gradient(
        125deg,
        transparent 70%,
        ${shade(0.2, props.theme.banner)} 30%
      );
    `};
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  position: relative;

  max-width: 1200px;

  h1,
  h3 {
    color: ${(props) => props.theme.textLight};
  }

  h1 {
    font-weight: 700;
    font-size: 30px;
  }

  h3 {
    font-weight: lighter;
    letter-spacing: 1.5px;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 12px;
    }
    h1 {
      font-size: 23px;
    }
  }
`;
