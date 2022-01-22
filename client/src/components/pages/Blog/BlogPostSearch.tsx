import React, { FC, useCallback } from 'react';
import { useRouter } from 'next/router';

import useChangeEvent from '@src/hooks/useChangeEvent';
import Search from '@molecules/Search';

const BlogPostSearch: FC = () => {
  const router = useRouter();
  const [searchWord, , onChangeSearchWord] = useChangeEvent('');

  const onSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchWord.trim().length > 1) {
        router.push(`/blog/search/${searchWord}`);
      }
    },
    [searchWord],
  );
  return <Search onChange={onChangeSearchWord} value={searchWord} onSearch={onSearch} />;
};

export default BlogPostSearch;
