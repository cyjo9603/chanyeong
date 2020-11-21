import React from 'react';

import PageContainer from '@frames/RowFrame';
import TUIEditor from '@organisms/TUIEditor';
import Button from '@atoms/Button';
import { getPost_GetPost_post } from '@gql-types/api';
import { BlogWriteHeader, BlogWriteBottom } from './styled';
import PostTagForm from './PostTagForm';

interface Props {
  title: string;
  post: getPost_GetPost_post;
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
    <BlogWriteHeader>
      <div>
        <span>제목 : </span>{' '}
        <input type="text" onChange={onChangeTitle} value={title} />
      </div>
      <div>
        <span>카테고리 : </span>
        <select onChange={onChangeCategory}>
          <option value="DEV">개발</option>
          <option value="DIARY">일기</option>
        </select>
      </div>
    </BlogWriteHeader>
    <TUIEditor
      onChange={setContent}
      setImage={setImage}
      initialValue={post?.content || ''}
    />
    <BlogWriteBottom>
      <PostTagForm
        tags={tags}
        addTag={addTag}
        removeTag={removeTag}
        onChangeInsertTag={onChangeInsertTag}
        insertTagRef={insertTagRef}
      />
      <Button onClick={onSubmit} name="작성" />
    </BlogWriteBottom>
  </PageContainer>
);

export default WritePostPresenter;
