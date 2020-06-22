import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import removeMd from 'remove-markdown';

import PageContainer from '../../../component/pageContainer';
import PagePath from '../../../component/PagePath';
import TUIViewer from '../../../component/TUIViewer';
import Tag from '../../../component/Tag';
import { getPost_GetPost } from '../../../types/api';
import { GET_POST } from '../../../queries/post.queries';
import { GET_LOCAL_USER } from '../../../queries/client';
import { PostWrapper, PostHeader } from './styled';
import dateFormat from '../../../lib/dateFormat';
import Button from '../../../component/Button';

interface Props {
  GetPost: getPost_GetPost;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/blog', name: 'BLOG' },
];

const BlogPost = ({ GetPost: { post } }: Props) => {
  const { data } = useQuery(GET_LOCAL_USER);
  const postPath = useMemo(() => [...path, { path: `/blog/post/${post.id}`, name: post.title }], [post]);

  return (
    <>
      <Helmet>
        <title>{post.title} :: chanyeong</title>
        <meta name="description" content={removeMd(post.content, { useImgAltText: false })} />
        <meta name="og:title" content={`${post.title} - chanyeong`} />
        <meta name="og:description" content={removeMd(post.content, { useImgAltText: false })} />
        <meta name="og:image" content={post.titleImage} />
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.css" />
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
                  <Link href={{ pathname: '/blog/write', query: { id: post.id } }} as={`/blog/write/${post.id}`}>
                    <a>
                      <Button name="편집" align="right" />
                    </a>
                  </Link>
                )}
              </div>
              {post.Tags.map((v) => (
                <Tag key={`blog_post_${post.id}_${v.id}`} name={v.name} />
              ))}
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
