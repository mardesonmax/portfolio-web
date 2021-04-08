import styled, { css, keyframes } from 'styled-components';
import { transparentize } from 'polished';
import Tooltip from '../Tooltip';

interface LabelProps {
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
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${(props) => transparentize(0.7, props.theme.textDark)};
  background: ${(props) => props.theme.container};
  box-shadow: ${(props) => props.theme.boxShadow};
  border: 2px transparent;
  padding: 16px;
  border-radius: 5px;
  transition: 0.2s ease all;

  ${(props) =>
    props.isError &&
    css`
      border-color: ${props.theme.error};
      animation: ${animation} 0.2s;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      > span {
        color: ${props.theme.primary};
      }
    `}



  input[type='checkbox'] {
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
    flex: 1;
  }

  input[type='checkbox'] {
    flex: none !important;
    height: 18px;
    width: 18px;
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

    &::before {
      border-color: ${(props) => props.theme.error} transparent;
    }
  }
`;
