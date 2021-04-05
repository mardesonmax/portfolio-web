import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background: ${(props) => props.theme.container};
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px;
  border-radius: 5px;
  position: relative;
  box-shadow: ${(props) => props.theme.boxShadow};

  h1 {
    color: ${(props) => props.theme.default};
    font-weight: bold;
  }

  > div {
    display: flex;
    a {
      margin-left: 10px;
    }
  }
`;
