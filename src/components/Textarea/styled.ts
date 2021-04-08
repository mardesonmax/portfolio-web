import styled, { css, keyframes } from 'styled-components';
import { transparentize } from 'polished';
import Tooltip from '../Tooltip';

interface LabelProps {
  isFocused: boolean;
  isError: boolean;
  isFilled: boolean;
}

const animation = keyframes`
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
  flex-direction: column;
  width: 100%;
  color: ${(props) => transparentize(0.7, props.theme.textDark)};
  background: ${(props) => props.theme.container};
  box-shadow: ${(props) => props.theme.boxShadow};
  border: 2px solid transparent;
  padding: 16px;
  border-radius: 5px;
  transition: 0.2s ease all;

  > span {
    margin-bottom: 5px;
  }

  > div {
    display: flex;
  }

  ${(props) =>
    props.isError &&
    css`
      border-color: ${props.theme.error};
      animation: ${animation} 0.2s;

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


  textarea {
    flex: 1;
    resize: none;
    height: 150px;
    flex: 1;
    border: 0;
    background: transparent;
    color: ${(props) => props.theme.textDark};

    &::placeholder {
      color: ${(props) => transparentize(0.7, props.theme.textDark)};
    }
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

    &::before {
      border-color: ${(props) => props.theme.error} transparent;
    }
  }
`;
