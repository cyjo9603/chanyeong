import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';

import BlogPresenter from './BlogPresenter';

import { GET_POSTS } from '../../queries/post.queries';
import { GET_TAGS } from '../../queries/tag.queries';
import { getPosts, getTags } from '../../types/api';
import { GET_LOCAL_USER } from '../../queries/client';
import useChangeEvent from '../../lib/useChangeEvent';

const BlogContainer = () => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const [category, setCategory] = useState(null);
  const [tagId, setTagId] = useState(null);
  const [searchWord, , onChangeSearchWord] = useChangeEvent<HTMLInputElement>('');
  const lastId = useRef(null);
  const { data: postData, fetchMore, refetch } = useQuery<getPosts>(GET_POSTS, { variables: { category, tagId } });
  const { data: tagData } = useQuery<getTags>(GET_TAGS);

  useEffect(() => {
    refetch();
  }, []);

  const onScroll = useCallback(() => {
    const posts = postData?.GetPosts?.posts;
    if (
      posts &&
      lastId.current !== posts?.[posts.length - 1].id &&
      document.body.scrollTop + document.body.clientHeight > document.body.scrollHeight - 400
    ) {
      lastId.current = posts[posts.length - 1].id;
      fetchMore({
        variables: {
          category,
          tagId,
          lastId: lastId.current,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          const newPosts = [...prev.GetPosts.posts, ...fetchMoreResult.GetPosts.posts];
          const fetchData: getPosts = { ...prev, GetPosts: { ...fetchMoreResult.GetPosts, posts: newPosts } };
          return fetchData;
        },
      });
    }
  }, [postData, category, lastId.current, tagId]);

  const onSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchWord.trim().length > 1) {
        Router.push({ pathname: '/blog/search', query: { word: searchWord } }, `/blog/search/${searchWord}`);
      }
    },
    [searchWord],
  );

  const onChangeCategory = useCallback((categoryName: string | null) => {
    setCategory(categoryName);
    setTagId(null);
  }, []);
  const onChangeTagId = useCallback((tagId: number) => {
    setTagId(tagId);
  }, []);

  const onClickWritePost = useCallback(() => {
    Router.push('/blog/write');
  }, []);

  useEffect(() => {
    document.body.addEventListener('scroll', onScroll);

    return () => {
      document.body.removeEventListener('scroll', onScroll);
    };
  }, [postData, category, lastId.current, tagId]);

  return (
    <BlogPresenter
      userInfo={userInfo}
      category={category}
      searchWord={searchWord}
      postData={postData?.GetPosts.posts || []}
      tagData={tagData?.GetTags.tags || []}
      onSearch={onSearch}
      onClickWritePost={onClickWritePost}
      onChangeSearchWord={onChangeSearchWord}
      onChangeCategory={onChangeCategory}
      onChangeTagId={onChangeTagId}
    />
  );
};

export default BlogContainer;
