import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 10;

  h1 {
    margin-bottom: 20px;
    color: ${(props) => props.theme.primary};
  }

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    padding: 20px;
    margin: 0 20px;
    border-radius: 5px;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.primary};
      transition: color 0.2s;

      &:hover {
        color: ${(props) => shade(0.2, props.theme.primary)};
      }
    }

    button {
      padding: 16px;
      width: 100%;
      margin: 15px 0;
      font-weight: 500;
      font-size: 16px;
    }
  }
`;
