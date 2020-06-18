import React, { useState, useCallback, useRef, useEffect } from 'react';
import Router from 'next/router';
import { Helmet } from 'react-helmet';
import { useMutation } from '@apollo/react-hooks';

import PageContainer from '../../../component/pageContainer';
import TUIEditor from '../../../component/TUIEditor';
import Tag from '../../../component/Tag';
import { BlogWriteHeader, BlogWriteBottom } from './styled';
import { WRITE_POST } from './WritePost.queries';
import { getAccessToken } from '../../../lib/cookie';
import { writePost } from '../../../types/api';

const WritePost = () => {
  const [writePostMutation] = useMutation<writePost>(WRITE_POST, {
    context: {
      headers: {
        'X-JWT': getAccessToken(),
      },
    },
    onCompleted: ({ WritePost }) => {
      if (WritePost.ok) {
        Router.push('/blog');
      }
    },
  });
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [titleImage, setTitleImage] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DEV');
  const [tags, setTags] = useState<string[]>([]);
  const [insertTag, setInsertTag] = useState('');
  const insertTagRef = useRef<HTMLInputElement>();
  const onClick = () => {
    if (content.trim() && title.trim()) {
      writePostMutation({
        variables: {
          category,
          title,
          content,
          titleImage: titleImage || undefined,
          tags,
        },
      });
    }
  };

  useEffect(() => {
    if (titleImage === '') {
      setTitleImage(image);
    }
  }, [image]);

  const onChangeCategory = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }, []);

  const onChangeInsertTag = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInsertTag(e.target.value);
  }, []);
  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const addTag = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newTags = [...tags];
      const tag = insertTag.trim();
      const existingTag = newTags.find((v) => v === tag);
      if (!existingTag) {
        newTags.push(tag);
        setTags(newTags);
      }
      if (insertTagRef.current) {
        insertTagRef.current.value = '';
      }
    },
    [tags, insertTag, insertTagRef],
  );

  const removeTag = useCallback(
    (tag) => {
      const newTags = [...tags];
      const removeIndex = newTags.findIndex((v) => v === tag);
      newTags.splice(removeIndex, 1);
      setTags(newTags);
    },
    [tags],
  );

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css" />
        <link rel="stylesheet" href="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.css" />
      </Helmet>
      <PageContainer>
        <BlogWriteHeader>
          <div>
            <span>제목 : </span> <input type="text" onChange={onChangeTitle} />
          </div>
          <div>
            <span>카테고리 : </span>
            <select onChange={onChangeCategory}>
              <option value="DEV" selected>
                개발
              </option>
              <option value="DIARY">일기</option>
            </select>
          </div>
        </BlogWriteHeader>
        <TUIEditor onChange={setContent} setImage={setImage} />
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
          <button onClick={onClick}>작성</button>
        </BlogWriteBottom>
      </PageContainer>
    </>
  );
};
export default WritePost;
