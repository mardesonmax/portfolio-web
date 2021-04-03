import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface Props {
  scrollTop: number;
}

export const Container = styled.header<Props>`
  width: 100%;
  top: 0;
  background: ${(props) => props.theme.container};
  padding: 0 20px;
  z-index: 9999;
  transition: 0.3s ease all;

  ${(props) =>
    props.scrollTop > 60 &&
    css`
      position: sticky;
      box-shadow: ${props.theme.boxShadow};
      background: ${transparentize(-1, props.theme.container)};
    `}

  nav {
    margin: 0 auto;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;

    .logo {
      display: flex;
      padding: 10px 0;

      img {
        width: 150px;
      }
    }

    ul {
      display: flex;
      list-style: none;
      li.user {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${(props) => props.theme.primary};
        margin-right: 10px;

        svg {
          margin-right: 8px;
        }
      }

      li {
        margin-left: 10px;

        button {
          border: none;
          background: none;

          &:hover {
            color: ${(props) => props.theme.textLight};
            background: ${(props) => props.theme.error};
          }
        }

        a {
          &:hover {
            color: ${(props) => props.theme.textLight};
            background: ${(props) => props.theme.primary};
          }

          &.active,
          &.active:hover {
            background: none;
            color: ${(props) => props.theme.primary};
          }
        }

        a,
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px 10px;
          text-decoration: none;
          color: ${(props) => props.theme.primary};
          position: relative;
          border-radius: 5px;
          transition: 0.2s ease all;

          svg {
            margin-right: 5px;
            font-size: 20px;
          }

          &.active::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: ${(props) => props.theme.primary};
          }
        }

        button.theme {
          svg {
            margin: 0 8px;
          }
        }
      }
    }
  }
`;
