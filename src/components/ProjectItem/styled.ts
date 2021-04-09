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

const animeLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(50px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const animeRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ProjectContent = styled.div`
  position: relative;

  > a {
    animation: ${animeLeft} 0.5s;
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0;
    background: ${(props) => props.theme.container};
    border-radius: 5px;
    border-top: 8px solid ${(props) => props.theme.primary};
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
        h2,
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
      flex-direction: column;
      padding: 15px;
      z-index: 200;
      background: ${(props) => props.theme.container};
      position: relative;

      .info {
        flex: 1;
        h2,
        span {
          color: ${(props) => props.theme.primary};
        }
        p {
          color: ${(props) => props.theme.textDark};
          margin: 5px 0px 15px;
        }
      }
    }

    &:hover {
      img {
        transform: scale(1.02);
      }

      .col-2 {
        .info {
          h2,
          span {
            color: ${(props) => shade(0.2, props.theme.primary)};
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
    animation: ${animeRight} 0.5s;
    border-color: ${(props) => props.theme.default};
    .col-2 {
      order: 6;
      .info {
        h2,
        span {
          color: ${(props) => props.theme.default};
        }
      }

      &:hover {
        .info {
          h2,
          span {
            color: ${(props) => shade(0.2, props.theme.default)};
          }
        }
      }
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
