import React, { FC, memo } from 'react';
import { useReactiveVar } from '@apollo/client';

import styled from '@theme/styled';
import { blogCategoryVar } from '@store/blogCategory';
import TagWithNumber from '@molecules/TagWithNumber';
import { GetTags_getTags_tags as Tag } from '@gql-types/api';

interface Props {
  tags: Tag[];
  onCLick: (tagId: number) => void;
}

const StyledTagWithNumberList = styled.aside`
  width: 17%;

  & > section {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  & > span {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    font-size: 16px;
    font-weight: 800;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 16%;
  }
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: none;
  }
`;

const TagWithNumberList: FC<Props> = ({ tags, onCLick }) => {
  const { tagId } = useReactiveVar(blogCategoryVar);
  return (
    <StyledTagWithNumberList>
      <span>인기 태그</span>
      <section>
        {tags.map((v) => (
          <TagWithNumber
            key={`popularity_tag${v.id}`}
            data={v}
            onClick={onCLick}
            isFocus={tagId === v.id}
          />
        ))}
      </section>
    </StyledTagWithNumberList>
  );
};

export default memo(TagWithNumberList);
