import styled, { css, keyframes } from 'styled-components';
import { transparentize } from 'polished';
import Tooltip from '../Tooltip';

interface LabelProps {
  isFocused: boolean;
  isError: boolean;
  isFilled: boolean;
}

const animeScale = keyframes`
   0%,
    100% {
      transform: translateX(-5px);
    }

    50% {
      transform: translateX(5px);
    }
`;

export const Container = styled.label<LabelProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${(props) => transparentize(0.7, props.theme.textDark)};
  background: ${(props) => props.theme.container};
  box-shadow: ${(props) => props.theme.boxShadow};
  border: 2px solid transparent;
  padding: 16px;
  border-radius: 5px;
  border-radius: 5px;
  transition: 0.2s ease all;

  ${(props) =>
    props.isError &&
    css`
      border-color: ${props.theme.error};
      animation: ${animeScale} 0.2s;

      > svg,
      > span {
        color: ${props.theme.error};
      }
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${props.theme.primary};
      > svg {
        color: ${props.theme.primary};
        transform: scale(1.5);
      }

      > span {
        color: ${props.theme.primary};
      }
    `}

    ${(props) =>
    props.isFilled &&
    css`
      > svg {
        color: ${props.theme.primary};
        transform: scale(1.5);
      }

      > span {
        color: ${props.theme.primary};
      }
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: ${(props) => props.theme.textDark};

    &::placeholder {
      color: ${(props) => transparentize(0.7, props.theme.textDark)};
    }
  }

  > span {
    display: block;
    margin-right: 8px;
  }

  > svg {
    margin-right: 10px;
    transition: 0.2s ease all;
  }

  & + label {
    margin-top: 15px;
  }
`;

export const Error = styled(Tooltip)`
  width: 16px;
  height: 16px;
  margin-left: 10px;
  cursor: default;

  svg {
    font-size: 18px;
  }

  span {
    background: ${(props) => props.theme.error};
    color: ${(props) => props.theme.textLight};

    &::before {
      border-color: ${(props) => props.theme.error} transparent;
    }
  }
`;
