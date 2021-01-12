import React from 'react';

import PageContainer from '@frames/RowFrame';
import TUIEditor from '@organisms/TUIEditor';
import Button from '@atoms/Button';
import { GetPost_GetPost_post as Post } from '@gql-types/api';
import styled from '@theme/styled';
import PostTagForm from './PostTagForm';

interface Props {
  title: string;
  post: Post;
  insertTagRef: React.MutableRefObject<HTMLInputElement>;
  tags: string[];
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  addTag: (e: React.FormEvent) => void;
  removeTag: (tag: string) => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeInsertTag: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const StyledWritePost = styled.section`
  & header {
    margin: 10px 0;
    display: flex;
    color: ${({ theme }) => theme.PRIMARY_FONT};

    & input {
      border: 1px solid ${(props) => props.theme.BORDER_LINE_DARK_GREY};
      width: 400px;

      &:focus {
        outline: none;
      }
    }

    & > div:first-child {
      margin-right: 20px;
    }
  }

  & footer {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const WritePostPresenter = ({
  title,
  post,
  insertTagRef,
  tags,
  setContent,
  setImage,
  addTag,
  removeTag,
  onChangeTitle,
  onChangeCategory,
  onChangeInsertTag,
  onSubmit,
}: Props) => (
  <PageContainer>
    <StyledWritePost>
      <header>
        <div>
          <span>제목 : </span> <input type="text" onChange={onChangeTitle} value={title} />
        </div>
        <div>
          <span>카테고리 : </span>
          <select onChange={onChangeCategory}>
            <option value="DEV">개발</option>
            <option value="DIARY">일기</option>
          </select>
        </div>
      </header>
      <TUIEditor onChange={setContent} setImage={setImage} initialValue={post?.content || ''} />
      <footer>
        <PostTagForm
          tags={tags}
          addTag={addTag}
          removeTag={removeTag}
          onChangeInsertTag={onChangeInsertTag}
          insertTagRef={insertTagRef}
        />
        <Button onClick={onSubmit} name="작성" />
      </footer>
    </StyledWritePost>
  </PageContainer>
);

export default WritePostPresenter;
