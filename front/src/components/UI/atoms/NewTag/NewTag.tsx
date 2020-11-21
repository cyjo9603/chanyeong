import React, { FC } from 'react';

import styled from '@theme/styled';

const StyledNewTag = styled.span`
  margin-left: 8px;
  padding: 0 4px;
  font-size: 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.NEW_COLOR};
  color: ${({ theme }) => theme.DARK_BACKGROUND_GREY};
`;

const NewTag: FC = () => <StyledNewTag>new</StyledNewTag>;

export default NewTag;
