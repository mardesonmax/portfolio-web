import styled, { keyframes } from 'styled-components';

const animeBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 15px;
  width: 100%;
  max-width: 1200px;
  border-radius: 5px;
  display: flex;

  > div {
    flex: 1;
  }
`;

export const AboutContact = styled.div`
  flex: 1;
  align-self: flex-start;

  .abouts {
    margin-top: 15px;
    background: ${(props) => props.theme.container};
    box-shadow: ${(props) => props.theme.boxShadow};
    animation: ${animeBottom} 1s ease;
    border-radius: 5px;
    padding: 10px;
  }
`;
