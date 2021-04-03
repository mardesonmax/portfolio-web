import styled from 'styled-components';
import { shade } from 'polished';

import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;

  border: 0;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  background: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.textLight};
  text-decoration: none;
  transition: 0.2s ease all;

  svg {
    margin-right: 8px;
  }

  &:hover {
    transform: scale(0.95);
    background: ${(props) => shade(0.2, props.theme.secondary)};
  }
`;
