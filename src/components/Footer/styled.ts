import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex: 1;
  width: 100%;
`;

export const Content = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  p {
    color: ${(props) => props.theme.textDark};
    a {
      margin-left: 5px;
      color: ${(props) => props.theme.textDark};
      transition: 0.3s ease all;

      &:hover {
        color: ${(props) => props.theme.primary};
      }
    }

    span {
      margin: 0 5px;
      font-size: 16px;
    }
  }
`;
