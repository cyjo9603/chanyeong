import React, { useMemo } from 'react';
import Link from 'next/link';
import removeMd from 'remove-markdown';

import { BlogPostCardWrapper, Type, TitleWrapper, ContentWrapper, TagListWrapper } from './styled';
import Tag from '../Tag';
import { getPosts_GetPosts_posts } from '../../types/api';
import dateFormat from '../../lib/dateFormat';

interface Props {
  data: getPosts_GetPosts_posts;
}

const BlogPostCard = ({ data: { id, category, title, createdAt, content, Tags, titleImage } }: Props) => {
  const postContent = useMemo(() => removeMd(content, { useImgAltText: false }).slice(0, 300), [content]);

  return (
    <Link href={{ pathname: '/blog/post', query: { id } }} as={`/blog/post/${id}`}>
      <a>
        <BlogPostCardWrapper>
          <div>
            <Type>{category}</Type>
            <TitleWrapper>
              <span>{title}</span>
              <span>{dateFormat(+createdAt)}</span>
            </TitleWrapper>
            <ContentWrapper>{postContent}</ContentWrapper>
            <TagListWrapper>
              {Tags?.map((v) => (
                <Tag key={`blog_post${id}_tag${v.id}`} name={v.name} />
              ))}
            </TagListWrapper>
          </div>
          <img src={titleImage} alt="post_card" />
        </BlogPostCardWrapper>
      </a>
    </Link>
  );
};

export default BlogPostCard;
