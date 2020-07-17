import React, { memo } from 'react';

import { TagWrapper } from './styled';

import { getTags_GetTags_tags } from '../../types/api';

interface Props {
  data: getTags_GetTags_tags;
  onClick: (tagId: number) => void;
}

const TagCount = ({ data, onClick }: Props) => (
  <TagWrapper onClick={() => onClick(data.id)}>
    <span>{data.name}</span>
    <span>{data.count}</span>
  </TagWrapper>
);

export default memo(TagCount);
