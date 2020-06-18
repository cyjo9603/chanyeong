import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import removeMd from 'remove-markdown';

import { BlogPostCardWrapper, Type, TitleWrapper, ContentWrapper, TagListWrapper } from './styled';
import Tag from '../Tag';
import { getPosts_GetPosts_posts } from '../../types/api';

interface Props {
  data: getPosts_GetPosts_posts;
}

const BlogPostCard = ({ data: { id, category, title, createdAt, content, Tags, titleImage } }: Props) => (
  <Link href={`/blog/post/${id}`}>
    <a>
      <BlogPostCardWrapper>
        <div>
          <Type>{category}</Type>
          <TitleWrapper>
            <span>{title}</span>
            <span>{moment(+createdAt).format('YYYY / MM / DD')}</span>
          </TitleWrapper>
          <ContentWrapper>{removeMd(content, { useImgAltText: false })}</ContentWrapper>
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

export default BlogPostCard;
