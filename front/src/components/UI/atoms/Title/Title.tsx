import React, { FC } from 'react';

import styled from '@theme/styled';

export const DEFAULT_SIZE = 1.8 as const;
export const SMALL_SIZE = 1.5 as const;

type TitleAlign = 'left' | 'right' | 'center';
type TitleSize = typeof DEFAULT_SIZE | typeof SMALL_SIZE;

interface Props {
  text: string;
  size?: TitleSize;
  align?: TitleAlign;
}

interface StyledProps {
  align: TitleAlign;
  size: TitleSize;
}

const StyledTitle = styled.h1<StyledProps>`
  font-size: ${({ size }) => size}rem;
  font-weight: 700;
  color: ${({ theme }) => theme.PRIMARY_FONT};
  margin: ${({ size }) => (size === DEFAULT_SIZE ? '16px 0 4px' : '')};
  text-align: ${({ align }) => align};
`;

const Title: FC<Props> = ({ text, size = DEFAULT_SIZE, align }) => (
  <StyledTitle size={size} align={align}>
    {text}
  </StyledTitle>
);

Title.defaultProps = {
  align: 'left',
  size: DEFAULT_SIZE,
};

export default Title;
