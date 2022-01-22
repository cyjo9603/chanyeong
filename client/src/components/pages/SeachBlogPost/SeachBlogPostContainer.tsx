import React, { useCallback, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { SEARCH_POSTS } from '@queries';
import { SearchPosts } from '@gql-types/api';
import useFetchScroll from '@hooks/useFetchScroll';
import { NextPage } from 'next';
import SearchBlogPostPresenter from './SearchBlogPostPresenter';

interface Props {
  word: string;
}

const SearchPageContainer: NextPage<Props> = ({ word }) => {
  const lastId = useRef(null);
  const listRef = useRef(null);
  const { data, fetchMore } = useQuery<SearchPosts>(SEARCH_POSTS, {
    variables: { input: { searchWord: word } },
  });

  const postFetch = useCallback(() => {
    if (!fetchMore) return;
    fetchMore({
      variables: {
        input: {
          lastId: lastId.current,
          searchWord: word,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        const newPosts = [...(prev.searchPosts?.posts || []), ...fetchMoreResult.searchPosts.posts];
        const fetchData: SearchPosts = {
          ...prev,
          searchPosts: { ...fetchMoreResult.searchPosts, posts: newPosts },
        };
        return fetchData;
      },
    });
  }, [data, lastId.current]);

  useEffect(() => {
    if (!data?.searchPosts?.posts.length) return;
    const { posts } = data.searchPosts;
    lastId.current = posts[posts.length - 1].id;
  }, [data]);

  useFetchScroll(listRef, postFetch);

  return (
    <SearchBlogPostPresenter
      searchWord={word}
      posts={data?.searchPosts.posts || []}
      ref={listRef}
    />
  );
};

export default SearchPageContainer;
