import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';

import { GET_POSTS } from '@queries/post.queries';
import { GET_TAGS } from '@queries/tag.queries';
import { GET_LOCAL_USER } from '@queries/client';
import { getPosts, getTags } from '@gql-types/api';
import BlogPresenter from './BlogPresenter';

const BlogContainer = () => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const [category, setCategory] = useState(null);
  const [tagId, setTagId] = useState(null);
  const lastId = useRef({});
  const { data: postData, fetchMore, refetch } = useQuery<getPosts>(GET_POSTS, {
    variables: { category, tagId },
  });
  const { data: tagData } = useQuery<getTags>(GET_TAGS);

  useEffect(() => {
    document.body.scrollTo(0, 0);
    refetch();
  }, []);

  const onScroll = useCallback(() => {
    const posts = postData?.GetPosts?.posts;
    if (
      posts &&
      lastId.current[category] !== posts?.[posts.length - 1].id &&
      document.body.scrollTop + document.body.clientHeight >
        document.body.scrollHeight - 400
    ) {
      lastId.current[category] = posts[posts.length - 1].id;
      fetchMore({
        variables: {
          category,
          tagId,
          lastId: lastId.current[category],
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          const newPosts = [
            ...prev.GetPosts.posts,
            ...fetchMoreResult.GetPosts.posts,
          ];
          const fetchData: getPosts = {
            ...prev,
            GetPosts: { ...fetchMoreResult.GetPosts, posts: newPosts },
          };
          return fetchData;
        },
      });
    }
  }, [postData, category, lastId.current, tagId]);

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
      postData={postData?.GetPosts.posts || []}
      tagData={tagData?.GetTags.tags || []}
      onClickWritePost={onClickWritePost}
      onChangeCategory={onChangeCategory}
      onChangeTagId={onChangeTagId}
    />
  );
};

export default BlogContainer;
