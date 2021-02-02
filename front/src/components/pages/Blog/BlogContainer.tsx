import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';

import { userInfoVar } from '@store/userInfo';
import { GET_POSTS, GET_TAGS } from '@queries';
import { GetPosts, GetTags } from '@gql-types/api';
import useFetchScroll from '@hooks/useFetchScroll';
import BlogPresenter from './BlogPresenter';

const BlogContainer = () => {
  const router = useRouter();
  const userInfo = useReactiveVar(userInfoVar);
  const [category, setCategory] = useState(null);
  const [tagId, setTagId] = useState(null);
  const lastId = useRef({});
  const listRef = useRef(null);
  const { data: postData, fetchMore, refetch } = useQuery<GetPosts>(GET_POSTS, {
    variables: { input: { category, tagId } },
  });
  const { data: tagData } = useQuery<GetTags>(GET_TAGS);

  const postFetch = useCallback(() => {
    fetchMore({
      variables: {
        input: { category, tagId, lastId: lastId.current[category] },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        const newPosts = [...prev.getPosts.posts, ...fetchMoreResult.getPosts.posts];
        const fetchData: GetPosts = {
          ...prev,
          getPosts: { ...fetchMoreResult.getPosts, posts: newPosts },
        };
        return fetchData;
      },
    });
  }, [lastId.current, postData, category]);

  const onChangeCategory = useCallback((categoryName: string | null) => {
    setCategory(categoryName);
    setTagId(null);
  }, []);
  const onChangeTagId = useCallback((tagId: number) => {
    setTagId(tagId);
  }, []);

  const onClickWritePost = useCallback(() => {
    router.push('/blog/write');
  }, []);

  useEffect(() => {
    if (!postData?.getPosts?.posts.length) return;
    const { posts } = postData.getPosts;
    lastId.current[category] = posts[posts.length - 1].id;
  }, [postData]);

  useEffect(() => {
    document.body.scrollTo(0, 0);
    refetch();
  }, []);

  useFetchScroll(listRef, postFetch);

  return (
    <BlogPresenter
      ref={listRef}
      userName={userInfo.userName}
      category={category}
      postData={postData?.getPosts.posts || []}
      tagData={tagData?.getTags.tags || []}
      onClickWritePost={onClickWritePost}
      onChangeCategory={onChangeCategory}
      onChangeTagId={onChangeTagId}
    />
  );
};

export default BlogContainer;
