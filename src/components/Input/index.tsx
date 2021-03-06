import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { IconBaseProps } from 'react-icons';
import { Container, Error } from './styled';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ label, name, icon: Icon, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
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
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused} isError={isError}>
      {Icon && <Icon />}
      {label && <span>{label}</span>}
      <input
        defaultValue={defaultValue}
        onFocus={() => setIsFocused(true)}
        onBlur={handleOnBlur}
        name={name}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error error={error}>
          <FiAlertCircle color="#f25264" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
