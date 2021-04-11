import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 20px;
  width: 100%;
  max-width: 1200px;
  border-radius: 5px;

  .add-project {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
`;
