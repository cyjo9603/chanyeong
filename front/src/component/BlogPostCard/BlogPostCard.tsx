import React, { useMemo, memo } from 'react';
import Link from 'next/link';
import removeMd from 'remove-markdown';

import { BlogPostCardWrapper, Type, TitleWrapper, ContentWrapper, TagListWrapper, NewPost } from './styled';
import Tag from '../../commons/Tag';
import { getPosts_GetPosts_posts } from '../../types/api';
import dateFormat from '../../lib/dateFormat';

interface Props {
  data: getPosts_GetPosts_posts;
}

const THREEDAY = 3 * 24 * 60 * 60 * 1000;

const BlogPostCard = ({ data: { id, category, title, createdAt, content, Tags, titleImage } }: Props) => {
  const postContent = useMemo(() => removeMd(content, { useImgAltText: false }).slice(0, 300), [content]);
  const isNew = useMemo(() => +createdAt > +new Date() - THREEDAY, []);

  return (
    <Link href={{ pathname: '/blog/post', query: { id } }} as={`/blog/post/${id}`}>
      <a>
        <BlogPostCardWrapper hasImage={Boolean(titleImage)}>
          <div>
            <Type>{category}</Type>
            <TitleWrapper>
              <span>{title}</span>
              <span>
                {dateFormat(+createdAt)}
                {isNew && <NewPost>new</NewPost>}
              </span>
            </TitleWrapper>
            <ContentWrapper>{postContent}</ContentWrapper>
            <TagListWrapper>
              {Tags?.map((v) => (
                <Tag key={`blog_post${id}_tag${v.id}`} name={v.name} />
              ))}
            </TagListWrapper>
          </div>
          {titleImage && <img src={titleImage} alt="post_card" />}
        </BlogPostCardWrapper>
      </a>
    </Link>
  );
};

export default memo(BlogPostCard);
