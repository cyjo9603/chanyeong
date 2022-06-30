import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
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

const FullButton: FC<Props> = ({ text, disabled, type, onClick }) => (
  <StyledFullButton disabled={disabled} type={type} onClick={onClick}>
    {text}
  </StyledFullButton>
);

FullButton.defaultProps = {
  type: 'submit',
  disabled: false,
};

export default FullButton;
