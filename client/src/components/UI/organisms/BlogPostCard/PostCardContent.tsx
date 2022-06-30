import React, { FC } from 'react';

import styled from 'styled-components';

interface Props {
  content: string;
}

const StyledPostCardContent = styled.div`
  font-size: 14px;
  height: 70px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: none;
  }
`;

const PostCardContent: FC<Props> = ({ content }) => (
  <StyledPostCardContent>{content}</StyledPostCardContent>
);

export default PostCardContent;
