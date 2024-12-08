// Input.tsx

import React, { ChangeEvent } from 'react';

interface InputProps {
  id: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  className: string;
}

const Input: React.FC<InputProps> = ({ id, type, name, value, onChange, placeholder, className }) => {
  return (
    <>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        />
      )}
    </>
  );
};

export default Input;
