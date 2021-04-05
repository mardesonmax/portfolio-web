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
    margin-top: 15px;

    .submit-button {
      display: flex;
      justify-content: flex-end;

      button {
        width: auto;
        margin: 0;
        margin: 15px 0;
      }
    }
  }
`;
