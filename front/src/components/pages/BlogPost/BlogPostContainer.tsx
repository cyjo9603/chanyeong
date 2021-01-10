import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import removeMd from 'remove-markdown';

import { DELETE_POST, FIX_POST } from '@queries/post.queries';
import { userInfoVar } from '@store/userInfo';
import { getPost_GetPost_post, deletePost, fixPost } from '@gql-types/api';
import BlogPostPresenter from './BlogPostPresenter';

const FIX_POST_TRUE = '게시글 고정' as const;
const FIX_POST_FALSE = '게시글 고정 해제' as const;

const MAX_DESCRIPTION = 400 as const;

export type FixPost = typeof FIX_POST_TRUE | typeof FIX_POST_FALSE;

interface Props {
  post: getPost_GetPost_post;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/blog', name: 'BLOG' },
];

const BlogPostContainer = ({ post }: Props) => {
  const router = useRouter();
  const [isFixed, setIsFixed] = useState(post?.picked ? FIX_POST_FALSE : FIX_POST_TRUE);
  const userInfo = useReactiveVar(userInfoVar);
  const postDescription = useMemo(
    () => removeMd(post?.content, { useImgAltText: false }).slice(0, MAX_DESCRIPTION),
    [],
  );
  const [deletePostMutation] = useMutation<deletePost>(DELETE_POST, {
    variables: { id: post?.id },
    onCompleted: async ({ DeletePost }) => {
      if (DeletePost.ok) {
        router.push('/blog');
      }
    },
  });
  const [fixPostMutation] = useMutation<fixPost>(FIX_POST, {
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
      userName={userInfo.userName}
      postPath={postPath}
      onClickDelete={onClickDelete}
      onClickFix={onClickFix}
    />
  ) : (
    <></>
  );
};

export default BlogPostContainer;
