import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface Props {
  active?: boolean;
}

export const Container = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease all;

  > div {
    transform: translateY(-120px);
    transition: 0.3s ease all;
  }

  opacity: 0;
  visibility: hidden;

  ${(props) =>
    props.active &&
    css`
      opacity: 1;
      visibility: visible;
      > div {
        transform: translateY(0);
      }
    `}

  z-index: 99999;
`;

export const Content = styled.div`
  background: ${(props) => props.theme.background};
  min-width: 300px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.textDark};

  h2 {
    border-bottom: 2px solid ${(props) => shade(0.2, props.theme.background)};
  }

  p {
    margin-top: 15px;
  }

  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
`;
