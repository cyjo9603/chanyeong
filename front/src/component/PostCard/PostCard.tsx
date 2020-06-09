import React from 'react';
import Link from 'next/link';

import { PostCardWrapper, NoImage, PostContent } from './styled';
import { getPickedPosts_GetPickedPosts_posts } from '../../types/api';

interface Props {
  data: getPickedPosts_GetPickedPosts_posts;
}

const PostCard = ({ data: { id, title, content, titleImage } }: Props) => (
  <Link href={`/blog/${id}`}>
    <a>
      <PostCardWrapper>
        {titleImage ? <img src={titleImage} alt={`post ${title}`} /> : <NoImage />}
        <PostContent>
          <h1>{title}</h1>
          <h2>{content}</h2>
          <div></div>
        </PostContent>
      </PostCardWrapper>
    </a>
  </Link>
);

export default PostCard;