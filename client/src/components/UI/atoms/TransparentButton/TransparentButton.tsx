import React, { FC, ReactNode } from 'react';

import styled from 'styled-components';

interface Props {
  children?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const StyledTransparentButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const TransparentButton: FC<Props> = ({ children, onClick, type }) => (
  <StyledTransparentButton type={type} onClick={onClick}>
    {children}
  </StyledTransparentButton>
);

TransparentButton.defaultProps = {
  type: 'button',
};

export default TransparentButton;
