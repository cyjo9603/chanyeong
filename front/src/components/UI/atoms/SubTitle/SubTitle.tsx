import React, { FC } from 'react';

import styled from '@theme/styled';

export const SUBTITLE_WEIGHT_DEFAULT = 500;
export const SUBTITLE_WEIGHT_BOLD = 700;

type SubTitleAlign = 'left' | 'right' | 'center';
type SubTitleWeight =
  | typeof SUBTITLE_WEIGHT_DEFAULT
  | typeof SUBTITLE_WEIGHT_BOLD;

interface Props {
  text: string;
  weight?: SubTitleWeight;
  align?: SubTitleAlign;
}

interface StyledProps {
  align: SubTitleAlign;
  weight: SubTitleWeight;
}

const SUB_TITLE_SIZE = 1;

const StyledSubTitle = styled.h2<StyledProps>`
  font-size: ${SUB_TITLE_SIZE}rem;
  font-weight: ${({ weight }) => weight};
  color: ${({ theme }) => theme.PRIMARY_FONT};
  text-align: ${({ align }) => align};
`;

const SubTitle: FC<Props> = ({ text, weight, align }) => (
  <StyledSubTitle align={align} weight={weight}>
    {text}
  </StyledSubTitle>
);

SubTitle.defaultProps = {
  align: 'left',
  weight: SUBTITLE_WEIGHT_DEFAULT,
};

export default SubTitle;
