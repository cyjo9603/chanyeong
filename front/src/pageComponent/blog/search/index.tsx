import React, { useCallback, useRef, useEffect } from 'react';
import { NextPageContext } from 'next';
import { useQuery } from '@apollo/react-hooks';

import PageContainer from '../../../component/pageContainer';
import BlogPostCard from '../../../component/BlogPostCard';
import { SearchPageWrapper, NoPost } from './styled';
import { SEARCH_POSTS } from '../../../queries/post.queries';
import { searchPosts } from '../../../types/api';

interface Props {
  word: string;
}

const SearchPage = ({ word }: Props) => {
  const lastId = useRef(null);
  const { data, fetchMore } = useQuery<searchPosts>(SEARCH_POSTS, { variables: { searchWord: word } });

  const onScroll = useCallback(() => {
    const { posts } = data?.SearchPosts;
    if (
      lastId.current !== posts?.[posts.length - 1].id &&
      window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 400
    ) {
      lastId.current = posts[posts.length - 1].id;
      fetchMore({
        variables: {
          lastId: lastId.current,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          const newPosts = [...prev.SearchPosts.posts, ...fetchMoreResult.SearchPosts.posts];
          const fetchData: searchPosts = { ...prev, SearchPosts: { ...fetchMoreResult.SearchPosts, posts: newPosts } };
          return fetchData;
        },
      });
    }
  }, [data, lastId.current]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [data, lastId.current]);

  return (
    <PageContainer>
      <SearchPageWrapper>
        <header>
          <h1>검색 결과 : {word}</h1>
        </header>
        {data?.SearchPosts.posts && data.SearchPosts.posts.length !== 0 ? (
          data.SearchPosts.posts.map((v) => <BlogPostCard key={`blog_search_${word}_${v.id}`} data={v} />)
        ) : (
          <NoPost>&apos;{word}&apos;와 일치하는 포스트가 없습니다.</NoPost>
        )}
      </SearchPageWrapper>
    </PageContainer>
  );
};

SearchPage.getInitialProps = (context: NextPageContext) => {
  if (context.query.word) {
    const { word } = context.query;
    return { word };
  }
};

export default SearchPage;
