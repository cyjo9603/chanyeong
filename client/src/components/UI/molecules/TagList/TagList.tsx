import React, { FC } from 'react';

import { GetPosts_getPosts_posts_tags as TagType } from '@gql-types/api';
import styled from '@theme/styled';
import Tag from '@atoms/Tag';

interface Props {
  postId: number;
  responsive?: boolean;
  tags: TagType[];
}

interface StyledProps {
  responsive: boolean;
}

const StyledTagList = styled.div<StyledProps>`
  margin-top: 10px;

  & > span {
    margin-right: 8px;
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    ${({ responsive }) => responsive && 'display: none;'}
  }
`;

const TagList: FC<Props> = ({ postId, responsive, tags }) => (
  <StyledTagList responsive={responsive}>
    {tags.map((v) => (
      <Tag key={`blog_post${postId}_tag${v.id}`} name={v.name} />
    ))}
  </StyledTagList>
);

export default TagList;
