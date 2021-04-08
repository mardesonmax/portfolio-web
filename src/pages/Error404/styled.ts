import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  height: calc(100vh - 90px);
  justify-content: center;
  align-items: center;

  div.error {
    margin: 15px;
    width: 100%;
    max-width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 10px;

    > svg {
      color: ${(props) => props.theme.error};
      font-size: 60px;
      margin-bottom: 20px;
    }

    span {
      display: flex;
      flex-wrap: wrap;
      font-size: 40px;
      color: ${(props) => props.theme.error};
      justify-content: center;

      h1 {
        font-size: 110px;
        margin-top: -30px;
      }
    }

    p {
      font-size: 20px;
      color: ${(props) => props.theme.primary};
    }
  }
`;
