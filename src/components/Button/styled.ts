import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { Props } from './index';

const backgroundButton = {
  default: css`
    background: ${(props) => props.theme.default};
    &:hover {
      background: ${(props) => shade(0.2, props.theme.default)};
    }
  `,
  primary: css`
    background: ${(props) => props.theme.primary};
    &:hover {
      background: ${(props) => shade(0.2, props.theme.primary)};
    }
  `,
  secondary: css`
    background: ${(props) => props.theme.secondary};
    &:hover {
      background: ${(props) => shade(0.2, props.theme.secondary)};
    }
  `,
};

export const Container = styled.button<Props>`
  display: flex;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: 0.2s ease all;
  color: ${(props) => props.theme.textLight};

  ${(props) => backgroundButton[props.bgColor || 'default']}

  &:hover {
    transform: scale(0.98);
  }
`;
