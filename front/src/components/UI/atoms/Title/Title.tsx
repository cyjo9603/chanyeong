import React, { FC } from 'react';

import styled from '@theme/styled';

type TitleAlign = 'left' | 'right' | 'center';

interface Props {
  text: string;
  align?: TitleAlign;
}

interface StyledProps {
  align: TitleAlign;
}

const TITLE_SIZE = 1.8 as const;

const StyledTitle = styled.h1<StyledProps>`
  font-size: ${TITLE_SIZE}rem;
  font-weight: 700;
  color: ${({ theme }) => theme.PRIMARY_FONT};
  margin: 16px 0 4px;
  text-align: ${({ align }) => align};
`;

const Title: FC<Props> = ({ text, align }) => (
  <StyledTitle align={align}>{text}</StyledTitle>
);

Title.defaultProps = {
  align: 'left',
};

export default Title;
