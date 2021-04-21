import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;

  h2 {
    color: ${(props) => props.theme.primary};
  }

  p {
    margin-top: 5px;
    color: ${(props) => props.theme.textDark};
    font-size: 16px;
  }

  > div {
    display: flex;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 15px;
    position: absolute;
    justify-content: space-around;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s ease all;
    background: rgba(0, 0, 0, 0.3);

    > div {
      margin: 0 5px;
    }
  }

  &:hover {
    > div {
      opacity: 1;
      visibility: visible;
    }
  }
`;
