import React from 'react';

import PageContainer from '@component/pageContainer';
import BlogPostCard from '@component/BlogPostCard';
import { searchPosts_SearchPosts_posts } from '@gql-types/api';
import { SearchPageWrapper, NoPost } from './styled';

interface Props {
  searchWord: string;
  posts: searchPosts_SearchPosts_posts[];
}

const SearchBlogPostPresenter = ({ searchWord, posts }: Props) => (
  <PageContainer>
    <SearchPageWrapper>
      <header>
        <h1>검색 결과 : {searchWord}</h1>
      </header>
      {posts.length !== 0 ? (
        posts.map((v) => <BlogPostCard key={`blog_search_${searchWord}_${v.id}`} data={v} />)
      ) : (
        <NoPost>&apos;{searchWord}&apos;와 일치하는 포스트가 없습니다.</NoPost>
      )}
    </SearchPageWrapper>
  </PageContainer>
);

export default SearchBlogPostPresenter;
