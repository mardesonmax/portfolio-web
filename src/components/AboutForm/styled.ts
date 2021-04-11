import styled, { css, keyframes } from 'styled-components';

const animeTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface Props {
  edit?: boolean;
}

export const Container = styled.div<Props>`
  form {
    animation: ${animeTop} 0.5s;
    margin-top: 15px;

    > div {
      display: flex;
      justify-content: space-between;
      margin: 15px 0;
    }
  }

  ${(props) =>
    props.edit &&
    css`
      form {
        animation: none;
        margin: 15px 0;
        padding: 15px;
        background: ${props.theme.background};

        > div {
          margin: 0;
          margin-top: 15px;
        }
      }
    `}
`;
