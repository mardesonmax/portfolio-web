import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  z-index: 999;

  span {
    width: 160px;
    text-align: center;
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.textLight};
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    transition: 0.4s ease all;
    opacity: 0;
    visibility: hidden;

    &::before {
      content: '';
      position: absolute;
      border-style: solid;
      border-color: ${(props) => props.theme.primary} transparent;
      border-width: 6px 6px 0px 6px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
