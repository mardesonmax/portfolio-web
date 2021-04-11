import styled from 'styled-components';

export const Container = styled.nav`
  background: ${(props) => props.theme.container};
  box-shadow: ${(props) => props.theme.boxShadow};
  flex: 1;
  flex-basis: 250px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  padding: 15px;
  margin-right: 20px;
  border-radius: 5px;
  min-height: calc(100vh - 100px);

  ul {
    flex: 1;
    display: flex;
    flex-direction: column;
    list-style: none;

    li {
      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 5px;
        color: ${(props) => props.theme.textDark};
        margin-bottom: 10px;
        border-radius: 5px;
        border-bottom: 2px solid transparent;
        transition: 0.3s ease all;

        span {
          margin-left: 5px;
        }

        &:hover {
          background: ${(props) => props.theme.background};
        }

        &.active {
          border-radius: 0;
          border-color: ${(props) => props.theme.primary};
          color: ${(props) => props.theme.primary};

          &:hover {
            background: none;
          }
        }
      }
    }
  }

  > button {
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.secondary};
    transition: 0.3s ease all;
    padding: 5px;
    span {
      margin-left: 5px;
    }

    &:hover {
      background: ${(props) => props.theme.background};
    }
  }
`;
