import React, { FC } from 'react';

import styled from '@theme/styled';
import Tag from '@atoms/Tag';
import Button from '@atoms/Button';

interface Props {
  tags: string[];
  addTag: (e: React.FormEvent) => void;
  removeTag: (tag: string) => void;
  onChangeInsertTag: (e: React.ChangeEvent<HTMLInputElement>) => void;
  insertTagRef: React.MutableRefObject<HTMLInputElement>;
}

const StyledPostTagForm = styled.div`
  display: flex;
  align-items: center;

  & > div {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    & > span {
      margin-right: 8px;
      margin-bottom: 8px;
      background-color: ${(props) => props.theme.TAG_BACKGROUND};
      padding: 2px 8px;
      border-radius: 8px;

      & > span:first-child {
        margin-right: 0;
      }

      & > span:last-child {
        cursor: pointer;
      }
    }
  }

  & input {
    border: 1px solid ${(props) => props.theme.BORDER_LINE_DARK_GREY};
    width: 200px;
    margin-right: 20px;

    &:focus {
      outline: none;
    }
  }
`;

const PostTagForm: FC<Props> = ({
  tags,
  addTag,
  removeTag,
  onChangeInsertTag,
  insertTagRef,
}) => (
  <StyledPostTagForm>
    <span>태그</span>
    <form onSubmit={addTag}>
      <input type="text" onChange={onChangeInsertTag} ref={insertTagRef} />
      <Button name="추가" />
    </form>
    <div>
      {tags.map((v, i) => (
        <span key={`${v}_${i}`}>
          <Tag name={v} />
          <span onClick={() => removeTag(v)}>X</span>
        </span>
      ))}
    </div>
  </StyledPostTagForm>
);
export default PostTagForm;
