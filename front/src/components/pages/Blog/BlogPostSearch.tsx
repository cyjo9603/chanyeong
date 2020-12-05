import React, { FC, useCallback } from 'react';
import Router from 'next/router';

import useChangeEvent from '@src/hooks/useChangeEvent';
import Search from '@molecules/Search';

const BlogPostSearch: FC = () => {
  const [searchWord, , onChangeSearchWord] = useChangeEvent('');

  const onSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchWord.trim().length > 1) {
        Router.push(
          { pathname: '/blog/search', query: { word: searchWord } },
          `/blog/search/${searchWord}`,
        );
      }
    },
    [searchWord],
  );
  return (
    <Search
      onChange={onChangeSearchWord}
      value={searchWord}
      onSearch={onSearch}
    />
  );
};

export default BlogPostSearch;
