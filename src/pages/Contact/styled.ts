import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 15px;
  width: 100%;
  max-width: 700px;
  border-radius: 5px;

  form {
    margin: 15px 0;

    > div {
      display: flex;
      justify-content: flex-end;

      button {
        margin: 15px 0;
      }
    }
  }
`;
