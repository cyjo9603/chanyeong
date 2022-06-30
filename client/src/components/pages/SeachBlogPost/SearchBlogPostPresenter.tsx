import React, { forwardRef } from 'react';

import RowFrame from '@frames/RowFrame';
import BlogPostCard from '@organisms/BlogPostCard';
import { SearchPosts_searchPosts_posts as Post } from '@gql-types/api';
import styled from 'styled-components';

interface Props {
  searchWord: string;
  posts: Post[];
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

  & section > a > div {
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

const SearchBlogPostPresenter = forwardRef<HTMLDivElement, Props>(({ searchWord, posts }, ref) => (
  <RowFrame>
    <StyledSearchBlogPost>
      <header>
        <h1>검색 결과 : {searchWord}</h1>
      </header>
      <section ref={ref}>
        {posts.length !== 0 ? (
          posts.map((v, i) => (
            <BlogPostCard key={`blog_search_${searchWord}_${v.id}_${i}`} data={v} />
          ))
        ) : (
          <div className="empty-posts">&apos;{searchWord}&apos;와 일치하는 포스트가 없습니다.</div>
        )}
      </section>
    </StyledSearchBlogPost>
  </RowFrame>
));

export default SearchBlogPostPresenter;
