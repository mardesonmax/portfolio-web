import styled, { css } from 'styled-components';

interface Progress {
  progress: number;
}

export const Container = styled.div<Progress>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;

  > span {
    display: block;
    width: 50px;
    height: 50px;
    padding: 5px;
    border-radius: 50%;
    position: relative;

    ${(props) => {
      const deg = 90 + 3.6 * props.progress;
      const position = props.progress < 51 ? 'right' : 'left';
      const color =
        props.progress < 51 ? props.theme.default : props.theme.primary;

      return css`
        background: linear-gradient(
            to ${position},
            ${color} 50%,
            transparent 50%
          ),
          linear-gradient(
            ${deg}deg,
            ${props.theme.primary} 50%,
            ${props.theme.default} 50%
          );
      `;
    }}

    &::before {
      content: '${(props) => props.progress}%';
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform: scale(0.8);
      font-size: 20px;
      justify-content: center;
      align-items: center;
      background: ${(props) => props.theme.container};
      color: ${(props) => props.theme.textDark};
      border-radius: 50%;
    }
  }

  p {
    text-align: center;
    color: ${(props) => props.theme.textDark};
    margin-top: 5px;
    font-size: 12px;
    font-weight: 500;
  }
`;
