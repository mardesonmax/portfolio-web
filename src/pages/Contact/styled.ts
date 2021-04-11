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
      margin: 15px 0;
      animation: ${animeTop} 1s;

      > div {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
      }
    }
  }
`;
