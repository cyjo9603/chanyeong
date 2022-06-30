import React, { FC } from 'react';

import styled from 'styled-components';

export interface InputProps {
  type?: 'text' | 'password';
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const StyledTransparentInput = styled.input`
  width: 100%;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const TransparentInput: FC<InputProps> = ({ type, placeholder, onChange, value }) => (
  <StyledTransparentInput type={type} placeholder={placeholder} onChange={onChange} value={value} />
);

TransparentInput.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default TransparentInput;
