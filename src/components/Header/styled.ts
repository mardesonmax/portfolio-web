import styled, { css } from 'styled-components';

interface Props {
  scrollTop: number;
  height: number;
}

export const Container = styled.header<Props>`
  width: 100%;
  padding: 0 15px;
  z-index: 9999;
  min-height: 60px;
  background: ${(props) => props.theme.container};

  ${(props) =>
    props.scrollTop > props.height &&
    css`
      transition: 0.5s ease all;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
      position: sticky;
      top: ${-props.height}px;
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

        img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
        }

        a,
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          padding: 5px 8px;
          text-decoration: none;
          color: ${(props) => props.theme.textDark};
          position: relative;
          border-radius: 5px;
          transition: 0.2s ease all;

          svg {
            font-size: 22px;
          }

          span {
            margin-left: 5px;
          }

          &.active::before {
            content: '';
            transition-delay: 1s ease all;
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 100%;
            height: 3px;
            border-radius: 3px;
            background: ${(props) => props.theme.primary};
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

        button {
          border: none;
          background: none;

          .sun {
            color: yellow;
          }

          &:hover {
            transform: scale(1.2);
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
