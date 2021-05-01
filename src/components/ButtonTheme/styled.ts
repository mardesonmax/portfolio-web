import styled from 'styled-components';

export const Container = styled.button`
  border: none;
  background: none;
  color: ${(props) => props.theme.textDark};

  .sun {
    color: #bebe3f;
  }

  &:hover {
    transform: scale(1.2);
  }
`;
