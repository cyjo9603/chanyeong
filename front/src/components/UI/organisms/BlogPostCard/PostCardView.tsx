import React, { FC, useMemo } from 'react';
import removeMd from 'remove-markdown';

import styled from '@theme/styled';
import TagList from '@molecules/TagList';
import { GetPosts_GetPosts_posts as Posts } from '@gql-types/api';

import PostCardTitle from './PostCardTitle';
import PostCardContent from './PostCardContent';

interface Props {
  data: Posts;
}

interface StyledProps {
  hasImage: boolean;
}

const THREEDAY = 3 * 24 * 60 * 60 * 1000;

const StyledPostCardView = styled.div<StyledProps>`
  width: calc(100% - ${({ hasImage }) => (hasImage ? 290 : 0)}px);
  padding: 12px 18px;

  & > h5 {
    font-size: 12px;
    font-weight: 700;
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: calc(100% - ${({ hasImage }) => (hasImage ? 170 : 0)}px);
    padding: 12px 18px;

    & > h5 {
      font-size: 10px;
    }
  }
`;

const PostCardView: FC<Props> = ({ data }) => {
  const postContent = useMemo(
    () => removeMd(data.content, { useImgAltText: false }).slice(0, 300),
    [data.content],
  );
  const isNew = useMemo(() => +data.createdAt > +new Date() - THREEDAY, []);

  return (
    <StyledPostCardView hasImage={Boolean(data.titleImage)}>
      <h5>{data.category}</h5>
      <PostCardTitle title={data.title} createdAt={data.createdAt} isNew={isNew} />
      <PostCardContent content={postContent} />
      <TagList postId={data.id} tags={data.Tags || []} responsive />
    </StyledPostCardView>
  );
};

export default PostCardView;
