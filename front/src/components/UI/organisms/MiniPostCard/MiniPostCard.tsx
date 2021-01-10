import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import removeMd from 'remove-markdown';

import { getPicked_GetPickedPosts_posts } from '@gql-types/api';
import styled from '@theme/styled';

import MiniPostCardContent from './MiniPostCardContent';

interface Props {
  data: getPicked_GetPickedPosts_posts;
}

export const StyledMiniPostCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 230px;
  border: 1px solid ${(props) => props.theme.CARD_BORDER};
  transition: box-shadow 0.3s, border-color 0.3s;
  margin: 0 auto;

  &:hover {
    box-shadow: 3px 3px 3px ${(props) => props.theme.CARD_BORDER};
  }
`;

const MiniPostCard = ({ data: { id, title, content, titleImage } }: Props) => {
  const postContent = useMemo(() => removeMd(content, { useImgAltText: false }).slice(0, 100), [
    content,
  ]);

  return (
    <Link href={`/blog/post/${id}`} prefetch={false}>
      <a>
        <StyledMiniPostCard>
          {titleImage && <Image src={titleImage} alt={`post ${title}`} width={250} height={150} />}
          <MiniPostCardContent title={title} content={postContent} />
        </StyledMiniPostCard>
      </a>
    </Link>
  );
};

export default MiniPostCard;
