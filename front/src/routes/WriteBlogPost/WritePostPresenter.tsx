import React from 'react';

import PageContainer from '@component/pageContainer';
import TUIEditor from '@component/TUIEditor';
import Tag from '@commons/Tag';
import { getPost_GetPost_post } from '@gql-types/api';
import { BlogWriteHeader, BlogWriteBottom } from './styled';

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
        <span>제목 : </span> <input type="text" onChange={onChangeTitle} value={title} />
      </div>
      <div>
        <span>카테고리 : </span>
        <select onChange={onChangeCategory}>
          <option value="DEV">개발</option>
          <option value="DIARY">일기</option>
        </select>
      </div>
    </BlogWriteHeader>
    <TUIEditor onChange={setContent} setImage={setImage} initialValue={post?.content || ''} />
    <BlogWriteBottom>
      <div>
        <span>태그</span>
        <form onSubmit={addTag}>
          <input type="text" onChange={onChangeInsertTag} ref={insertTagRef} />
          <button type="submit">추가</button>
        </form>
        <div>
          {tags.map((v, i) => (
            <span key={`${v}_${i}`}>
              <Tag name={v} />
              <span onClick={() => removeTag(v)}>X</span>
            </span>
          ))}
        </div>
      </div>
      <button onClick={onSubmit}>작성</button>
    </BlogWriteBottom>
  </PageContainer>
);

export default WritePostPresenter;
