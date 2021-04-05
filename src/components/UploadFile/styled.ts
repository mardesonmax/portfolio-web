import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface DropzoneProps {
  isDragActive: boolean;
  isDragReject: boolean;
}

interface DropMessageProps {
  type?: 'success' | 'error';
}

const dragReject = css`
  border: 2px dashed ${(props) => props.theme.error};
`;
const dragActive = css`
  border: 2px dashed ${(props) => props.theme.success};
`;

export const Container = styled.div`
  background: ${(props) => props.theme.container};
  padding: 10px;
  border-radius: 5px;
  margin: 15px 0;
  box-shadow: ${(props) => props.theme.boxShadow};

  img {
    display: block;
    width: 100%;
    margin-top: 10px;
  }
`;

export const Dropzone = styled.div<DropzoneProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-height: 60px;
  width: 100%;
  padding: 15px;
  border: 2px dashed ${(props) => transparentize(0.6, props.theme.textDark)};
  border-radius: 5px;
  text-align: center;

  ${(props) => props.isDragActive && dragActive}
  ${(props) => props.isDragReject && dragReject}

  input {
    display: none;
  }
`;

const messageColors = {
  default: css`
    color: ${(props) => transparentize(0.6, props.theme.textDark)};
  `,
  success: css`
    color: ${(props) => props.theme.success};
  `,
  error: css`
    color: ${(props) => props.theme.error};
  `,
};

export const DropMessage = styled.p<DropMessageProps>`
  font-size: 20px;
  span {
    ${(props) => messageColors[props.type || 'default']}
    font-size: 16px;
  }
`;
