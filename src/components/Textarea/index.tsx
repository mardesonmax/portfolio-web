import React, {
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styled';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

const Textarea: React.FC<InputProps> = ({ label, name, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isError, setIsError] = useState(false);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!textareaRef.current?.value);
  }, []);

  useEffect(() => {
    setIsError(false);
    if (error) {
      setIsError(true);
    }
  }, [error]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused} isError={isError}>
      {label && <span>{label}</span>}
      <div>
        <textarea
          defaultValue={defaultValue}
          onFocus={() => setIsFocused(true)}
          onBlur={handleOnBlur}
          name={name}
          ref={textareaRef}
          {...rest}
        />
        {error && (
          <Error error={error}>
            <FiAlertCircle color="#f25264" />
          </Error>
        )}
      </div>
    </Container>
  );
};

export default Textarea;
