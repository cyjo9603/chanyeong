import React, { useMemo } from 'react';
import Link from 'next/link';
import removeMd from 'remove-markdown';

import { PostCardWrapper, NoImage, PostContent } from './styled';
import { getPicked_GetPickedPosts_posts } from '../../types/api';

interface Props {
  data: getPicked_GetPickedPosts_posts;
}

const PostCard = ({ data: { id, title, content, titleImage } }: Props) => {
  const postContent = useMemo(() => removeMd(content, { useImgAltText: false }).slice(0, 100), [content]);

  return (
    <Link href={{ pathname: '/blog/post', query: { id } }} as={`/blog/post/${id}`}>
      <a>
        <PostCardWrapper>
          {titleImage ? <img src={titleImage} alt={`post ${title}`} /> : <NoImage />}
          <PostContent>
            <h1>{title}</h1>
            <h2>{postContent}</h2>
          </PostContent>
        </PostCardWrapper>
      </a>
    </Link>
  );
};

export default PostCard;
