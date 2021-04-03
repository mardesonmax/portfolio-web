import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 20px;
  background: ${(props) => props.theme.container};
  width: 100%;
  max-width: 1200px;
  padding: 10px;
  border-radius: 5px;

  .project-container {
    .project-item {
      display: flex;
      flex-wrap: wrap;
      margin: 20px 10px;
      background: ${(props) => props.theme.container};
      border-radius: 5px;
      overflow: hidden;
      border-top: 5px solid ${(props) => props.theme.secondary};
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
        .info {
          padding: 20px;
          h3 {
            color: ${(props) => props.theme.secondary};
          }
          p {
            color: ${(props) => props.theme.textDark};
            margin-top: 10px;
          }
        }
      }

      &.left-position {
        border-color: ${(props) => props.theme.primary};
      }
      &.left-position .col-2 {
        order: 6;
        .info {
          padding: 20px;
          h3 {
            color: ${(props) => props.theme.primary};
          }
        }
      }

      .col-1,
      .col-2 {
        flex: 50%;
        flex-basis: 350px;
      }
    }
  }
`;
