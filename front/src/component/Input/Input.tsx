import React from 'react';

import { InputWrapper } from './styled';

interface Props {
  type?: 'text' | 'password';
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = ({ type = 'text', placeholder, onChange, value }: Props) => (
  <InputWrapper>
    <input type={type} placeholder={placeholder} onChange={onChange} value={value} />
  </InputWrapper>
);

export default Input;
