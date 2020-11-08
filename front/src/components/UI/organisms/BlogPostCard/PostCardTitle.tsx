import React, { FC } from 'react';

import styled from '@theme/styled';
import NewTag from '@atoms/NewTag';
import dateFormat from '@lib/dateFormat';

interface Props {
  title: string;
  createdAt: string;
  isNew: boolean;
}

export const StyledPostCardTitle = styled.div`
  margin: 4px 0;

  & > .blog-post-title {
    font-size: 18px;
    font-weight: 700;
  }

  & > .blog-post-content {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700;
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: flex;
    flex-direction: column-reverse;

    & > .blog-post-title {
      font-size: 16px;
    }
    & > .blog-post-content {
      display: block;
      margin-left: 0;
      font-size: 10px;
      font-weight: 500;
    }
  }
`;

const PostCardTitle: FC<Props> = ({ title, createdAt, isNew }) => (
  <StyledPostCardTitle>
    <span className="blog-post-title">{title}</span>
    <span className="blog-post-content">
      {dateFormat(+createdAt)}
      {isNew && <NewTag />}
    </span>
  </StyledPostCardTitle>
);

export default PostCardTitle;
