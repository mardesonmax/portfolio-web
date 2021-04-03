import styled from 'styled-components';

export const Container = styled.section`
  margin-top: 20px;
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  background: ${(props) => props.theme.container};
  border-radius: 5px;
  padding: 10px;
`;
