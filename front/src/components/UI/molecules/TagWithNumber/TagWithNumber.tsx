import React, { FC } from 'react';

import { GetTags_getTags_tags as Tags } from '@gql-types/api';
import styled from '@theme/styled';
import Tag from '@atoms/Tag';

export const TagWrapper = styled.div`
  display: flex;
  width: fit-content;
  justify-content: space-between;
  height: 23px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  margin-top: 4px;
  overflow: hidden;

  & span:not(.tag-number) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding: 0 14px;
    height: 100%;
  }

  & > .tag-number {
    font-weight: 500;
    height: 100%;
    background-color: ${({ theme }) => theme.PRIMARY_COLOR};
    color: ${({ theme }) => theme.LIGHT_GREY};
    padding: 0 10px;
  }
`;

interface Props {
  data: Tags;
  onClick: (tagId: number) => void;
}

const TagWithNumber: FC<Props> = ({ data, onClick }) => (
  <TagWrapper onClick={() => onClick(data.id)}>
    <Tag name={data.name} />
    <span className="tag-number">{data.count}</span>
  </TagWrapper>
);

export default TagWithNumber;
