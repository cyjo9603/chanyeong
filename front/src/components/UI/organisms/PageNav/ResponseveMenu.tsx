import React, { FC } from 'react';

import styled from '@theme/styled';

import MenuIcon from '@svg-icons/MenuIcon';
import TransparentButton from '@atoms/TransparentButton';

interface Props {
  onClick: () => void;
}

const StyledResonsiveButton = styled.span`
  & svg {
    display: none;
    fill: ${({ theme }) => theme.PRIMARY_FONT};
    width: 14px;
    cursor: pointer;
    padding: 0 20px;

    @media (max-width: ${({ theme }) => theme.BP.PC}) {
      display: block;
    }
  }
`;

const ResponsiveButton: FC<Props> = ({ onClick }) => (
  <StyledResonsiveButton>
    <TransparentButton onClick={onClick}>
      <MenuIcon />
    </TransparentButton>
  </StyledResonsiveButton>
);

export default ResponsiveButton;
