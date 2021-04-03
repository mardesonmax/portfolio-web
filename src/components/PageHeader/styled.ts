import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 10px;
  padding-bottom: 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    height: 2px;
    width: 100%;
    background: ${(props) => props.theme.background};
  }

  h1 {
    color: ${(props) => props.theme.primary};
  }
`;
