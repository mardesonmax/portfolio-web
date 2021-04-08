import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;

    img {
      width: 100px;
    }

    h1 {
      color: ${(props) => props.theme.error};
      font-size: 20px;
      margin-top: 20px;
    }

    p {
      margin-top: 5px;
      color: ${(props) => props.theme.textDark};
    }

    a {
      display: flex;
      padding: 10px 20px;
      text-decoration: none;
      color: ${(props) => props.theme.textLight};
      background: ${(props) => props.theme.primary};
      margin-top: 20px;
      border-radius: 10px;
      font-size: 16px;
      transition: 0.3s ease all;

      &:hover {
        background: ${(props) => shade(0.2, props.theme.primary)};
      }
    }
  }
`;
