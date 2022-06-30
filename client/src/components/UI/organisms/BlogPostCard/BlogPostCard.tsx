import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styled from 'styled-components';
import { GetPosts_getPosts_posts as Posts } from '@gql-types/api';

import PostCardView from './PostCardView';

interface Props {
  data: Posts;
}

const StyledBlogPostCard = styled.div<{ hasImage: boolean }>`
  width: 100%;
  height: 190px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.CARD_BORDER};
  transition: box-shadow 0.3s, border-color 0.3s;
  color: ${({ theme }) => theme.PRIMARY_FONT};

  &:hover {
    box-shadow: 5px 5px 5px ${({ theme }) => theme.CARD_BORDER};
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    height: 130px;

    & img {
      width: 170px;
    }
  }
`;

const BlogPostCard = ({ data }: Props) => {
  return (
    <Link href={`/blog/post/${data.id}`} prefetch={false}>
      <a>
        <StyledBlogPostCard hasImage={Boolean(data.titleImage)}>
          <PostCardView data={data} />
          {data.titleImage && (
            <Image src={data.titleImage} alt="post_card" width={290} height={'100%'} />
          )}
        </StyledBlogPostCard>
      </a>
    </Link>
  );
};

export default memo(BlogPostCard, (prev, next) => prev.data.id === next.data.id);
