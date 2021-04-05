/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
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
  title?: string;
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Checkbox: React.FC<InputProps> = ({
  title,
  name,
  icon: Icon,
  ...rest
}) => {
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleClick = useCallback(() => {
    setIsFilled(!!inputRef.current?.checked);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [defaultValue, fieldName, registerField]);
  return (
    <Container isFilled={isFilled} isError={!!error}>
      {Icon && <Icon />}
      {title && <span>{title}</span>}
      <input
        defaultChecked={false}
        onClick={handleClick}
        name={name}
        type="checkbox"
        value={defaultValue}
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

export default Checkbox;
