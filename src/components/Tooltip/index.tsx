import React from 'react';
import { Container } from './styled';

interface TooltipProps {
  error: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ error, children, className }) => {
  return (
    <Container className={className}>
      {children}
      <span>{error}</span>
    </Container>
  );
};

export default Tooltip;
