import styled, { keyframes } from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

const animeTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Content = styled.div`
  margin: 15px;
  width: 100%;
  max-width: 1200px;
  border-radius: 5px;
  display: flex;

  > div {
    flex: 1;

    form {
      animation: ${animeTop} 1s;
      margin-top: 15px;

      .new-password {
        display: flex;
        flex-direction: column;

        .title-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: ${(props) => props.theme.boxShadow};
          background: ${(props) => props.theme.container};
          padding: 10px;
          border-radius: 5px;

          p {
            color: ${(props) => props.theme.textDark};
          }
        }

        div + div {
          margin-top: 15px;
        }
      }

      > div {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
      }
    }
  }
`;
