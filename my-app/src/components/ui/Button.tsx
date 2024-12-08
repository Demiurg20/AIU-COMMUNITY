// Button.tsx
import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  className: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, className, children }) => {
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;
