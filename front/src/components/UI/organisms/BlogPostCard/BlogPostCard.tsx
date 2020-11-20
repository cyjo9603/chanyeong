import React from 'react';
import Link from 'next/link';

import styled from '@theme/styled';
import { getPosts_GetPosts_posts } from '@gql-types/api';

import PostCardView from './PostCardView';

interface Props {
  data: getPosts_GetPosts_posts;
}

const StyledBlogPostCard = styled.div<{ hasImage: boolean }>`
  width: 100%;
  height: 190px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.CARD_BORDER};
  transition: box-shadow 0.3s, border-color 0.3s;
  color: ${({ theme }) => theme.PRIMARY_FONT};

  & > img {
    width: 290px;
  }

  &:hover {
    box-shadow: 5px 5px 5px ${({ theme }) => theme.CARD_BORDER};
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    height: 130px;

    & > img {
      width: 170px;
    }
  }
`;

const BlogPostCard = ({ data }: Props) => {
  return (
    <Link
      href={{ pathname: '/blog/post', query: { id: data.id } }}
      as={`/blog/post/${data.id}`}
    >
      <a>
        <StyledBlogPostCard hasImage={Boolean(data.titleImage)}>
          <PostCardView data={data} />
          {data.titleImage && <img src={data.titleImage} alt="post_card" />}
        </StyledBlogPostCard>
      </a>
    </Link>
  );
};

export default BlogPostCard;