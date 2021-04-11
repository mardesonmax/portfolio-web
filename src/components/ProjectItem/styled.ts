import styled, { keyframes } from 'styled-components';
import { shade, transparentize } from 'polished';

const animeLeftRight = keyframes`
  0%,
  100% {
    transform: translateX(3px);
  }

  50% {
    transform: translateX(-3px);
  }
`;

const animeTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ProjectContent = styled.div`
  position: relative;
  animation: ${animeTop} 1s ease;

  > a {
    display: flex;
    margin-bottom: 20px;
    flex-wrap: wrap;
    background: ${(props) => props.theme.container};
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.boxShadow};
    overflow: hidden;
    position: relative;
    text-decoration: none;
    transition: 0.3s ease all;

    .col-1,
    .col-2 {
      flex: 1;
      flex-basis: 350px;

      .info {
        small {
          color: ${(props) => transparentize(0.2, props.theme.textDark)};
        }
        span {
          transition: 0.3s ease all;
          svg {
            margin-right: 3px;
            animation: ${animeLeftRight} 1s infinite;
          }
        }
      }
    }

    .col-1 {
      order: 10;
      max-height: 350px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.3s ease all;
        z-index: 100;
      }
    }

    .col-2 {
      order: 12;
      display: flex;
      align-items: center;
      padding: 20px;
      z-index: 200;
      background: ${(props) => props.theme.container};
      position: relative;

      .info {
        flex: 1;
        h1,
        span {
          color: ${(props) => props.theme.primary};
          transition: 0.3s ease all;
        }

        h1 {
          font-size: 25px;
        }

        span {
          font-size: 16px;
        }

        p {
          color: ${(props) => props.theme.textDark};
          margin: 5px 0px 15px;
          font-size: 16px;
        }
      }
    }

    &:hover {
      img {
        transform: scale(1.02);
      }

      .col-2 {
        .info {
          h1,
          span {
            color: ${(props) => shade(0.4, props.theme.primary)};
          }
        }
      }
    }

    &.disabled::before {
      content: 'DESATIVADO';
      position: absolute;
      left: -55px;
      top: 25px;
      height: 50px;
      width: 200px;
      transform: rotate(-50deg);
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      z-index: 200;
    }
  }

  &:nth-child(2n) > a {
    .col-2 {
      order: 6;
    }
  }

  .configs {
    position: absolute;
    top: 15px;
    right: 10px;
    z-index: 300;

    .button-config {
      display: flex;
      width: 35px;
      height: 35px;

      > svg {
        position: absolute;
        right: 0;
        font-size: 20px;
        color: ${(props) => props.theme.textDark};
        cursor: pointer;
        transition: 0.3s ease all;
        background: ${(props) => transparentize(0.2, props.theme.container)};
        width: 35px;
        height: 35px;
        border-radius: 50%;

        &:hover {
          background: ${(props) => shade(0.2, props.theme.container)};
        }
      }

      > div {
        display: none;
        opacity: 0;
        margin-right: 35px;
        transition: 0.3s initial;
      }

      &:hover {
        width: 100%;

        > div {
          opacity: 1;
          display: flex;

          button {
            margin: 0 10px;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    &:nth-child(2n) > a {
      .col-2 {
        order: 12;
      }
    }
  }
`;
