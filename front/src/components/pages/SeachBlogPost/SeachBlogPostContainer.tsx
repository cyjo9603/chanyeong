import React, { useCallback, useRef, useEffect } from 'react';
import { NextPageContext } from 'next';
import { useQuery } from '@apollo/react-hooks';

import { SEARCH_POSTS } from '@queries/post.queries';
import { searchPosts } from '@gql-types/api';
import SearchBlogPostPresenter from './SearchBlogPostPresenter';

interface Props {
  word: string;
}

const SearchPageContainer = ({ word }: Props) => {
  const lastId = useRef(null);
  const { data, fetchMore } = useQuery<searchPosts>(SEARCH_POSTS, {
    variables: { searchWord: word },
  });

  const onScroll = useCallback(() => {
    const { posts } = data?.SearchPosts;
    if (
      lastId.current !== posts?.[posts.length - 1].id &&
      document.body.scrollTop + document.body.clientHeight >
        document.body.scrollHeight - 400
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
          const newPosts = [
            ...prev.SearchPosts.posts,
            ...fetchMoreResult.SearchPosts.posts,
          ];
          const fetchData: searchPosts = {
            ...prev,
            SearchPosts: { ...fetchMoreResult.SearchPosts, posts: newPosts },
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
    <SearchBlogPostPresenter
      searchWord={word}
      posts={data?.SearchPosts.posts || []}
    />
  );
};

SearchPageContainer.getInitialProps = (context: NextPageContext) => {
  if (context.query.word) {
    const { word } = context.query;
    return { word };
  }
};

export default SearchPageContainer;
