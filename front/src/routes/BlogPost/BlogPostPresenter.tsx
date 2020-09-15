import React from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet';
import removeMd from 'remove-markdown';
import { DiscussionEmbed } from 'disqus-react';

import PageContainer from '../../component/pageContainer';
import PagePath from '../../component/PagePath';
import TUIViewer from '../../component/TUIViewer';
import Tag from '../../commons/Tag';
import Button from '../../commons/Button';
import { PostWrapper, PostHeader, TagWrapper } from './styled';
import { getPost_GetPost_post } from '../../types/api';
import dateFormat from '../../lib/dateFormat';
import { LocalSignIn } from '../../apollo';
import { FixPost } from './BlogPostContainer';

interface Props {
  isFixed: FixPost;
  post?: getPost_GetPost_post;
  userInfo: LocalSignIn;
  postPath: {
    path?: string;
    name: string;
  }[];
  onClickDelete: () => void;
  onClickFix: () => void;
}

const BlogPostPresenter = ({ isFixed, post, userInfo, postPath, onClickDelete, onClickFix }: Props) => (
  <>
    <Helmet>
      <title>{post.title} :: chanyeong</title>
      <meta name="description" content={removeMd(post.content, { useImgAltText: false })} />
      <meta name="og:title" content={`${post.title} - chanyeong`} />
      <meta name="og:description" content={removeMd(post.content, { useImgAltText: false })} />
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
          <TUIViewer content={post.content} />
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
