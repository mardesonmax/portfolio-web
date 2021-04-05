import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 15px;
  width: 100%;
  max-width: 1200px;
  border-radius: 5px;

  .project-container {
    .project-item {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      margin: 15px 0;
      background: ${(props) => props.theme.container};
      border-radius: 5px;
      overflow: hidden;
      border-top: 8px solid ${(props) => props.theme.primary};
      box-shadow: ${(props) => props.theme.boxShadow};

      .col-1 {
        order: 10;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .col-2 {
        order: 12;
        display: flex;
        flex-direction: column;
        padding: 15px;

        .info {
          flex: 1;
          h2 {
            color: ${(props) => props.theme.primary};
          }
          p {
            color: ${(props) => props.theme.textDark};
            margin: 5px 0px 15px;
          }
        }

        .configs {
          display: flex;
          justify-content: space-between;
        }
      }

      &.left-position {
        border-color: ${(props) => props.theme.default};
      }
      &.left-position .col-2 {
        order: 6;
        .info {
          h2 {
            color: ${(props) => props.theme.default};
          }
        }
      }

      .col-1,
      .col-2 {
        flex: 50%;
        flex-basis: 350px;
      }
    }

    .project-item.disabled::before {
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
      background: #777;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;
