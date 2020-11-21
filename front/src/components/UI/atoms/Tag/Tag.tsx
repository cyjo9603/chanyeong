import React, { FC } from 'react';

import styled from '@theme/styled';

interface Props {
  name: string;
}

const StyledTag = styled.span`
  background-color: ${(props) => props.theme.TAG_BACKGROUND};
  height: 20px;
  border-radius: 8px;
  padding: 2px 8px;
  color: ${({ theme }) => theme.PRIMARY_COLOR};
`;

const Tag: FC<Props> = ({ name }) => <StyledTag>{name}</StyledTag>;

export default Tag;
