import React, { useCallback, useEffect } from 'react';

import { useDropzone, FileWithPath } from 'react-dropzone';
import { toast } from 'react-toastify';

import { Dropzone, Container, DropMessage } from './styled';

interface File extends FileWithPath {
  url: string;
  id?: string;
}

interface Props {
  onUpload(files: FileWithPath[]): void;
  previews?: File[];
  maxFiles?: number;
}

const UploadFile: React.FC<Props> = ({ previews, onUpload, maxFiles }) => {
  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: 'image/*',
    maxFiles,
    onDropAccepted: onUpload,
  });

  useEffect(() => {
    if (fileRejections.length > 1) {
      toast('Falha ao inserir aquivos.', {
        type: 'error',
      });
    }
  }, [fileRejections]);

  const handleDropMessage = useCallback(() => {
    if (!isDragActive) {
      return (
        <DropMessage>
          😁️
          <span>
            Arraste e solte uma imagem aqui ou clique para selecionar.
          </span>
        </DropMessage>
      );
    }

    if (isDragReject) {
      return (
        <DropMessage type="error">
          🙄️ <span>Arquivos não suportados.</span>
        </DropMessage>
      );
    }

    return (
      <DropMessage type="success">
        😀️ <span>Ok, você já pode soltar a imagem.</span>
      </DropMessage>
    );
  }, [isDragActive, isDragReject]);

  return (
    <Container>
      <Dropzone
        {...getRootProps({ className: 'dropzone' })}
        isDragReject={isDragReject}
        isDragActive={isDragActive}
      >
        <input {...getInputProps()} />
        {handleDropMessage()}
      </Dropzone>
      {previews &&
        previews.map((file) => (
          <img key={file.id ? file.id : file.name} src={file.url} alt="File" />
        ))}
    </Container>
  );
};

export default UploadFile;
