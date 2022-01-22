import React, { FC } from 'react';

import styled from '@theme/styled';

interface Props {
  name: string;
  isFocus?: boolean;
}

const StyledTag = styled.span`
  background-color: ${({ theme }) => theme.TAG_BACKGROUND};
  height: 20px;
  border-radius: 8px;
  padding: 2px 8px;
  color: ${({ theme }) => theme.PRIMARY_COLOR};

  &.tag-focus {
    font-weight: 700;
  }
`;

const Tag: FC<Props> = ({ name, isFocus }) => (
  <StyledTag className={`${isFocus ? 'tag-focus' : ''}`}>{name}</StyledTag>
);

Tag.defaultProps = {
  isFocus: false,
};

export default Tag;
