import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { DiscussionEmbed } from 'disqus-react';

import RowFrame from '@frames/RowFrame';
import MarkdownViewer from '@organisms/MarkDownViewer';
import Toc from '@organisms/Toc';
import BreadCrumbs from '@molecules/BreadCrumbs';
import TagList from '@molecules/TagList';
import Button from '@atoms/Button';
import HugeText from '@atoms/HugeText';
import dateFormat from '@lib/dateFormat';
import { GetPost_getPost_post as Post } from '@gql-types/api';
import styled from '@theme/styled';
import { IsFixPost } from './BlogPostContainer';

interface Props {
  isFixed: IsFixPost;
  post?: Post;
  userName?: string;
  postPath: {
    path?: string;
    name: string;
  }[];
  postDescription: string;
  onClickDelete: () => void;
  onClickFix: () => void;
}

const StyledBlogPost = styled.div`
  margin-bottom: 80px;

  & > section {
    margin-bottom: 56px;
  }

  & .post-content {
    width: 100%;
    display: flex;
    justify-content: space-between;

    & > div {
      width: 78%;

      @media (max-width: ${({ theme }) => theme.BP.PC}) {
        width: 100%;
      }
    }
  }

  & #disqus_thread a {
    color: ${({ theme }) => theme.PRIMARY_COLOR} !important;
  }

  & .post-header {
    margin-bottom: 12px;

    & button {
      margin-left: 8px;
    }
  }
`;

const BlogPostPresenter = ({
  isFixed,
  post,
  userName,
  postPath,
  postDescription,
  onClickDelete,
  onClickFix,
}: Props) => (
  <>
    <Head>
      <title>{post.title} :: chanyeong</title>
      <meta name="description" content={`${postDescription}...`} />
      <meta name="og:title" content={`${post.title} - chanyeong`} />
      <meta name="og:description" content={`${postDescription}...`} />
      <meta name="og:image" content={post.titleImage} />
      <link
        rel="stylesheet"
        href="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/github.min.css"
      />
    </Head>
    <RowFrame>
      <StyledBlogPost>
        <BreadCrumbs data={postPath} page={`post_${post.title}`} />
        <section>
          <header className="post-header">
            <HugeText text={post.title} />
            <div>
              {dateFormat(post.createdAt)}
              {userName && (
                <>
                  <Button name="제거" align="right" onClick={onClickDelete} />
                  <Link href={`/blog/write/${post.id}`} prefetch={false}>
                    <a>
                      <Button name="편집" align="right" />
                    </a>
                  </Link>
                  <Button name={isFixed} align="right" onClick={onClickFix} />
                </>
              )}
            </div>
            <TagList postId={post.id} tags={post.tags} />
          </header>
          <hr />
          <section className="post-content">
            <MarkdownViewer content={post.content} />
            <Toc />
          </section>
        </section>
        <DiscussionEmbed
          shortname="canyeongyi-beulrogeu"
          config={{
            url: `https://chanyeong.com/blog/post/${post.id}`,
            identifier: `chanyeong-blog-${post.id}`,
            title: post.title,
          }}
        />
      </StyledBlogPost>
    </RowFrame>
  </>
);

export default BlogPostPresenter;
