import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px;
  border-radius: 5px;
  position: relative;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: ${(props) => props.theme.container};

  h1 {
    color: ${(props) => props.theme.default};
    font-weight: bold;
    font-size: 25px;
  }

  > div {
    display: flex;
    > div a,
    button {
      margin-left: 10px;
    }
  }

  @media (max-width: 768px) {
    > div {
      margin-left: 10px;
      button,
      a {
        svg {
          margin: 0;
        }
        span {
          display: none;
        }
      }
    }
  }
`;
