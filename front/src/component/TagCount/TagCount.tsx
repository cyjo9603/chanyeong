import React, { memo } from 'react';

import { getTags_GetTags_tags } from '@gql-types/api';
import { TagWrapper } from './styled';

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
