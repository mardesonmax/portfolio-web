import styled, { css } from 'styled-components';

interface Props {
  scrollTop: number;
  height: number;
}

export const Container = styled.header<Props>`
  width: 100%;
  top: ${(props) => -props.height}px;
  padding: 0 15px;
  z-index: 9999;
  min-height: 60px;
  background: ${(props) => props.theme.container};

  ${(props) =>
    props.scrollTop > props.height &&
    css`
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      position: sticky;
      transition: 0.5s ease all;
      transform: translateY(${props.height}px);
    `}

  nav {
    margin: 0 auto;
    min-height: inherit;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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
      flex: 1;
      justify-content: flex-end;
      list-style: none;

      li {
        margin-left: 10px;

        a,
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px 8px;
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
            transition-delay: 1s ease all;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: ${(props) => props.theme.default};
          }
        }

        a {
          color: ${(props) => props.theme.default};

          &:hover {
            color: ${(props) => props.theme.textLight};
            background: ${(props) => props.theme.default};
          }

          &.active,
          &.active:hover {
            background: none;
            color: ${(props) => props.theme.default};
          }
        }

        button {
          border: none;
          background: none;

          &:hover {
            color: ${(props) => props.theme.textLight};
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

  @media (max-width: 768px) {
    nav ul li {
      svg {
        margin: 0 !important;
      }
      span {
        display: none;
      }
    }
  }

  @media (max-width: 576px) {
    nav ul {
      margin-bottom: 5px;
      justify-content: space-between;
    }
  }
`;
