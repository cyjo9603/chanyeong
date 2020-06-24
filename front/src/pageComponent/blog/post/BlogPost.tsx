import React, { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import Router from 'next/router';
import removeMd from 'remove-markdown';

import PageContainer from '../../../component/pageContainer';
import PagePath from '../../../component/PagePath';
import TUIViewer from '../../../component/TUIViewer';
import Tag from '../../../component/Tag';
import { getPost_GetPost, deletePost, fixPost } from '../../../types/api';
import { GET_POST, DELETE_POST, FIX_POST } from '../../../queries/post.queries';
import { GET_LOCAL_USER } from '../../../queries/client';
import { PostWrapper, PostHeader, TagWrapper } from './styled';
import dateFormat from '../../../lib/dateFormat';
import Button from '../../../component/Button';
import { getAccessToken } from '../../../lib/cookie';

const FIX_POST_TRUE = '게시글 고정' as const;
const FIX_POST_FALSE = '게시글 고정 해제' as const;

interface Props {
  GetPost: getPost_GetPost;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/blog', name: 'BLOG' },
];

const BlogPost = ({ GetPost: { post } }: Props) => {
  const [isFixed, setIsFixed] = useState(post.picked ? FIX_POST_FALSE : FIX_POST_TRUE);
  const { data } = useQuery(GET_LOCAL_USER);
  const [deletePostMutation] = useMutation<deletePost>(DELETE_POST, {
    variables: { id: post.id },
    onCompleted: ({ DeletePost }) => {
      if (DeletePost.ok) {
        Router.push('/blog');
      }
    },
  });
  const [fixPostMutation] = useMutation<fixPost>(FIX_POST, {
    variables: { id: post.id, fix: isFixed === FIX_POST_TRUE },
    onCompleted: ({ FixPost }) => {
      if (FixPost.ok) {
        setIsFixed(isFixed === FIX_POST_TRUE ? FIX_POST_FALSE : FIX_POST_TRUE);
      }
    },
  });

  const postPath = useMemo(() => [...path, { path: `/blog/post/${post.id}`, name: post.title }], [post]);

  const onClickFix = useCallback(() => {
    fixPostMutation({
      context: {
        headers: {
          'X-JWT': getAccessToken(),
        },
      },
    });
  }, []);

  const onClickDelete = useCallback(() => {
    const result = confirm('정말 게시글을 삭제하시겠습니까?');
    if (result) {
      deletePostMutation({
        context: {
          headers: {
            'X-JWT': getAccessToken(),
          },
        },
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{post.title} :: chanyeong</title>
        <meta name="description" content={removeMd(post.content, { useImgAltText: false })} />
        <meta name="og:title" content={`${post.title} - chanyeong`} />
        <meta name="og:description" content={removeMd(post.content, { useImgAltText: false })} />
        <meta name="og:image" content={post.titleImage} />
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/github.min.css"
        />
      </Helmet>
      <PageContainer>
        <PostWrapper>
          <PagePath data={postPath} />
          <section>
            <PostHeader>
              <h1>{post.title}</h1>
              <div>
                {dateFormat(+post.createdAt)}
                {data?.isLoggedIn.userName && (
                  <>
                    <Button name="제거" align="right" onClick={onClickDelete} />
                    <Link href={{ pathname: '/blog/write', query: { id: post.id } }} as={`/blog/write/${post.id}`}>
                      <a>
                        <Button name="편집" align="right" />
                      </a>
                    </Link>
                    <Button name={isFixed} align="right" onClick={onClickFix} />
                  </>
                )}
              </div>
              <TagWrapper>
                {post.Tags.map((v) => (
                  <Tag key={`blog_post_${post.id}_${v.id}`} name={v.name} />
                ))}
              </TagWrapper>
            </PostHeader>
            <hr />
            <TUIViewer content={post.content} />
          </section>
        </PostWrapper>
      </PageContainer>
    </>
  );
};

BlogPost.getInitialProps = async (context) => {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;
    const { apolloClient } = context;
    const postData = await apolloClient.query({
      query: GET_POST,
      variables: { id: parseInt(id, 10) },
    });
    return postData.data;
  }
};

export default BlogPost;
