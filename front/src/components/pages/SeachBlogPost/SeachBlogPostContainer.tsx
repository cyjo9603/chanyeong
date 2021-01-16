import React, { useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { SEARCH_POSTS } from '@queries';
import { SearchPosts } from '@gql-types/api';
import SearchBlogPostPresenter from './SearchBlogPostPresenter';

const SearchPageContainer = () => {
  const router = useRouter();
  const { word } = router.query;
  const lastId = useRef(null);
  const { data, fetchMore } = useQuery<SearchPosts>(SEARCH_POSTS, {
    variables: { input: { searchWord: word } },
  });

  const onScroll = useCallback(() => {
    const { posts } = data?.searchPosts;
    if (
      lastId.current !== posts?.[posts.length - 1].id &&
      document.body.scrollTop + document.body.clientHeight > document.body.scrollHeight - 400
    ) {
      lastId.current = posts[posts.length - 1].id;
      fetchMore({
        variables: {
          input: {
            lastId: lastId.current,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          const newPosts = [...prev.searchPosts.posts, ...fetchMoreResult.searchPosts.posts];
          const fetchData: SearchPosts = {
            ...prev,
            searchPosts: { ...fetchMoreResult.searchPosts, posts: newPosts },
          };
          return fetchData;
        },
      });
    }
  }, [data, lastId.current]);

  useEffect(() => {
    document.body.addEventListener('scroll', onScroll);

    return () => {
      document.body.removeEventListener('scroll', onScroll);
    };
  }, [data, lastId.current]);

  return (
    <SearchBlogPostPresenter searchWord={word as string} posts={data?.searchPosts.posts || []} />
  );
};

export default SearchPageContainer;
