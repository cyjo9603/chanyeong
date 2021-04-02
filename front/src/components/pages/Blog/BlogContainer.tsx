import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';

import { userInfoVar } from '@store/userInfo';
import { blogCategoryVar, setTagId, setCategory } from '@store/blogCategory';
import { GET_POSTS, GET_TAGS } from '@queries';
import { GetPosts, GetTags } from '@gql-types/api';
import useFetchScroll from '@hooks/useFetchScroll';
import BlogPresenter from './BlogPresenter';

const BlogContainer = () => {
  const router = useRouter();
  const userInfo = useReactiveVar(userInfoVar);
  const blogCategory = useReactiveVar(blogCategoryVar);
  const lastId = useRef({});
  const listRef = useRef(null);
  const { data: postData, fetchMore } = useQuery<GetPosts>(GET_POSTS, {
    variables: { input: blogCategory },
  });
  const { data: tagData } = useQuery<GetTags>(GET_TAGS);

  const postFetch = useCallback(() => {
    fetchMore({
      variables: {
        input: { ...blogCategory, lastId: lastId.current[blogCategory.category] },
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
  }, [lastId.current, postData, blogCategory]);

  const onChangeCategory = useCallback((categoryName: string | null) => {
    setCategory(categoryName);
    setTagId();
  }, []);
  const onChangeTagId = useCallback(
    (tagId: number) => {
      setTagId(blogCategory.tagId !== tagId ? tagId : null);
    },
    [blogCategory.tagId],
  );

  const onClickWritePost = useCallback(() => {
    router.push('/blog/write');
  }, []);

  useEffect(() => {
    if (!postData?.getPosts?.posts.length) return;
    const { posts } = postData.getPosts;
    lastId.current[blogCategory.category] = posts[posts.length - 1].id;
  }, [postData]);

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  useFetchScroll(listRef, postFetch);

  return (
    <BlogPresenter
      ref={listRef}
      userName={userInfo.userName}
      category={blogCategory.category}
      postData={postData?.getPosts.posts || []}
      tagData={tagData?.getTags.tags || []}
      onClickWritePost={onClickWritePost}
      onChangeCategory={onChangeCategory}
      onChangeTagId={onChangeTagId}
    />
  );
};

export default BlogContainer;
