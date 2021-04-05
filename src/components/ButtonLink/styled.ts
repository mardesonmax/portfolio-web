import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { Link } from 'react-router-dom';

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

export const Container = styled.span<Props>`
  a {
    ${(props) => backgroundButton[props.bgColor || 'default']};
  }
`;

export const ButtonContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.textLight};
  text-decoration: none;
  transition: 0.2s ease all;

  &:hover {
    transform: scale(0.95);
  }

  svg {
    margin-right: 8px;
  }
`;
