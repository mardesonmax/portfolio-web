import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-width: 200px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      border: 5px solid ${(props) => props.theme.container};
      color: ${(props) => props.theme.primary};
      background: ${(props) => props.theme.background};
      width: 45px;
      height: 45px;
      border-radius: 50%;
      transition: 0.3s ease all;
    }

    &:hover {
      span {
        border-color: ${(props) => props.theme.background};
        color: ${(props) => props.theme.textLight};
        background: ${(props) => props.theme.primary};
      }
    }
  }
`;
