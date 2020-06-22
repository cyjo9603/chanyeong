import React from 'react';

import { ButtonWrapper } from './styled';

interface Props {
  name: string;
  align?: string;
  onClick?: () => void;
}

const Button = ({ name, onClick, align = 'none' }: Props) => (
  <ButtonWrapper align={align} onClick={onClick}>
    {name}
  </ButtonWrapper>
);

export default Button;
