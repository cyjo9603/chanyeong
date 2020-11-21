import React, { FC } from 'react';
import styled from '@theme/styled';

interface Props {
  text: string;
  disabled: boolean;
}

const StyledFullButton = styled.button`
  width: 100%;
  height: 38px;
  border: none;
  font-weight: 600;
  color: ${(props) => props.theme.DARK_BACKGROUND_GREY};
  background-color: ${(props) => props.theme.FOOTER_BACKGROUND};
  cursor: pointer;
  transition: opacity 0.5s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.DISABLED};
    opacity: 1;
    cursor: not-allowed;
  }
`;

const FullButton: FC<Props> = ({ text, disabled }) => (
  <StyledFullButton disabled={disabled}>{text}</StyledFullButton>
);

export default FullButton;
