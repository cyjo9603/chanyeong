import React from 'react';

import RowFrame from '@frames/RowFrame';
import BlogPostCard from '@organisms/BlogPostCard';
import { searchPosts_SearchPosts_posts } from '@gql-types/api';
import styled from '@theme/styled';

interface Props {
  searchWord: string;
  posts: searchPosts_SearchPosts_posts[];
}

const StyledSearchBlogPost = styled.section`
  margin: 0 auto;
  margin-top: 20px;
  width: 900px;

  & > header > h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.PRIMARY_FONT};
    margin-bottom: 20px;
  }

  & > a > div {
    margin-bottom: 40px;
  }

  & .empty-posts {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    width: 700px;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
  }
`;

const SearchBlogPostPresenter = ({ searchWord, posts }: Props) => (
  <RowFrame>
    <StyledSearchBlogPost>
      <header>
        <h1>검색 결과 : {searchWord}</h1>
      </header>
      {posts.length !== 0 ? (
        posts.map((v) => (
          <BlogPostCard key={`blog_search_${searchWord}_${v.id}`} data={v} />
        ))
      ) : (
        <div className="empty-posts">
          &apos;{searchWord}&apos;와 일치하는 포스트가 없습니다.
        </div>
      )}
    </StyledSearchBlogPost>
  </RowFrame>
);

export default SearchBlogPostPresenter;