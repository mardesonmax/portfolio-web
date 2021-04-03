import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import Tooltip from '../Tooltip';

interface LabelProps {
  isFocused: boolean;
  isError: boolean;
  isFilled: boolean;
}

export const Container = styled.label<LabelProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${(props) => transparentize(0.7, props.theme.textDark)};
  background: ${(props) => props.theme.container};
  border: 2px solid transparent;
  padding: 16px;
  border-radius: 5px;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: 0.2s ease all;
  cursor: text;

  ${(props) =>
    props.isError &&
    css`
      border-color: ${props.theme.error};
      animation: animation 0.2s;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${props.theme.primary};
      > svg {
        color: ${props.theme.primary};
        transform: scale(1.5);
      }
    `}

    ${(props) =>
    props.isFilled &&
    css`
      > svg {
        color: ${props.theme.primary};
        transform: scale(1.5);
      }
    `}

  @keyframes animation {
    0%,
    100% {
      transform: translateX(-5px);
    }

    50% {
      transform: translateX(5px);
    }
  }

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: ${(props) => props.theme.textDark};

    &::placeholder {
      color: ${(props) => transparentize(0.7, props.theme.textDark)};
    }
  }

  > svg {
    margin-right: 10px;
    transition: 0.2s ease all;
  }

  & + label {
    margin-top: 10px;
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

    &::before {
      border-color: ${(props) => props.theme.error} transparent;
    }
  }
`;
