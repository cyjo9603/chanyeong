import React from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet';
import { DiscussionEmbed } from 'disqus-react';

import PageContainer from '@component/pageContainer';
import PagePath from '@component/PagePath';
import Tag from '@commons/Tag';
import Button from '@commons/Button';
import dateFormat from '@lib/dateFormat';
import MarkdownViewer from '@src/component/MarkdownViewer';
import { getPost_GetPost_post } from '@gql-types/api';
import { LocalSignIn } from '@src/apollo';
import { PostWrapper, PostHeader, TagWrapper } from './styled';
import { FixPost } from './BlogPostContainer';

interface Props {
  isFixed: FixPost;
  post?: getPost_GetPost_post;
  userInfo: LocalSignIn;
  postPath: {
    path?: string;
    name: string;
  }[];
  postDescription: string;
  onClickDelete: () => void;
  onClickFix: () => void;
}

const BlogPostPresenter = ({
  isFixed,
  post,
  userInfo,
  postPath,
  postDescription,
  onClickDelete,
  onClickFix,
}: Props) => (
  <>
    <Helmet>
      <title>{post.title} :: chanyeong</title>
      <meta name="description" content={`${postDescription}...`} />
      <meta name="og:title" content={`${post.title} - chanyeong`} />
      <meta name="og:description" content={`${postDescription}...`} />
      <meta name="og:image" content={post.titleImage} />
      <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/github.min.css" />
    </Helmet>
    <PageContainer>
      <PostWrapper>
        <PagePath data={postPath} page={`post_${post.title}`} />
        <section>
          <PostHeader>
            <h1>{post.title}</h1>
            <div>
              {dateFormat(+post.createdAt)}
              {userInfo?.isLoggedIn.userName && (
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
          <MarkdownViewer content={post.content} />
        </section>
        <DiscussionEmbed
          shortname="canyeongyi-beulrogeu"
          config={{
            url: `https://chanyeong.com/blog/post/${post.id}`,
            identifier: `chanyeong-blog-${post.id}`,
            title: post.title,
          }}
        />
      </PostWrapper>
    </PageContainer>
  </>
);

export default BlogPostPresenter;
