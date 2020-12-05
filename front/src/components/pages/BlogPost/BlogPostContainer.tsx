import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';
import removeMd from 'remove-markdown';

import { useReissueMutation } from '@hooks/useApollo';
import { GET_POST, DELETE_POST, FIX_POST } from '@queries/post.queries';
import { GET_LOCAL_USER } from '@queries/client';
import { getPost_GetPost, deletePost, fixPost } from '@gql-types/api';
import BlogPostPresenter from './BlogPostPresenter';

const FIX_POST_TRUE = '게시글 고정' as const;
const FIX_POST_FALSE = '게시글 고정 해제' as const;

const MAX_DESCRIPTION = 400 as const;

export type FixPost = typeof FIX_POST_TRUE | typeof FIX_POST_FALSE;

interface Props {
  GetPost: getPost_GetPost;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/blog', name: 'BLOG' },
];

const BlogPostContainer = ({ GetPost }: Props) => {
  const { post } = useMemo(() => GetPost || { post: null }, []);
  const [isFixed, setIsFixed] = useState(
    post?.picked ? FIX_POST_FALSE : FIX_POST_TRUE,
  );
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const postDescription = useMemo(
    () =>
      removeMd(post?.content, { useImgAltText: false }).slice(
        0,
        MAX_DESCRIPTION,
      ),
    [],
  );
  const [deletePostMutation] = useReissueMutation<deletePost>(DELETE_POST, {
    variables: { id: post?.id },
    onCompleted: async ({ DeletePost }) => {
      if (DeletePost.ok) {
        Router.push('/blog');
      }
    },
  });
  const [fixPostMutation] = useReissueMutation<fixPost>(FIX_POST, {
    variables: { id: post?.id, fix: isFixed === FIX_POST_TRUE },
    onCompleted: async ({ FixPost }) => {
      if (FixPost.ok) {
        setIsFixed(isFixed === FIX_POST_TRUE ? FIX_POST_FALSE : FIX_POST_TRUE);
      }
    },
  });
  const postPath = useMemo(() => [...path, { name: post?.title }], []);
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);
  const onClickFix = useCallback(() => {
    fixPostMutation();
  }, []);
  const onClickDelete = useCallback(() => {
    const result = confirm('정말 게시글을 삭제하시겠습니까?');
    if (result) {
      deletePostMutation();
    }
  }, []);
  return post ? (
    <BlogPostPresenter
      isFixed={isFixed}
      post={post}
      postDescription={postDescription}
      userInfo={userInfo}
      postPath={postPath}
      onClickDelete={onClickDelete}
      onClickFix={onClickFix}
    />
  ) : (
    <></>
  );
};

BlogPostContainer.getInitialProps = async (context) => {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;
    const { apolloClient } = context;
    apolloClient.cache.reset();
    const postData = await apolloClient.query({
      query: GET_POST,
      variables: { id: parseInt(id, 10) },
    });
    return postData.data;
  }
};

export default BlogPostContainer;
