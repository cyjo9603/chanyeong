import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';

import PageContainer from '../../../component/pageContainer';
import PagePath from '../../../component/PagePath';
import TUIViewer from '../../../component/TUIViewer';
import Tag from '../../../component/Tag';
import { getPost_GetPost } from '../../../types/api';
import { GET_POST } from './GetPost.queries';
import { PostWrapper, PostHeader } from './styled';

interface Props {
  GetPost: getPost_GetPost;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/blog', name: 'BLOG' },
];

const BlogPost = ({ GetPost: { post } }: Props) => {
  const postPath = useMemo(() => [...path, { path: `/blog/post/${post.id}`, name: post.title }], [post]);
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.css" />
      </Helmet>
      <PageContainer>
        <PostWrapper>
          <PagePath data={postPath} />
          <section>
            <PostHeader>
              <h1>{post.title}</h1>
              <div>{moment(+post.createdAt).format('YYYY / MM / DD')}</div>
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
