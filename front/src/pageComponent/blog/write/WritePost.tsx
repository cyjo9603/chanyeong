import React, { useState, useCallback, useRef, useEffect } from 'react';
import Router from 'next/router';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from '@apollo/react-hooks';

import PageContainer from '../../../component/pageContainer';
import TUIEditor from '../../../component/TUIEditor';
import Tag from '../../../component/Tag';
import { BlogWriteHeader, BlogWriteBottom } from './styled';
import { WRITE_POST, GET_POST, EDIT_POST } from '../../../queries/post.queries';
import { getAccessToken } from '../../../lib/cookie';
import { writePost, getPost_GetPost, editPost } from '../../../types/api';
import { GET_LOCAL_USER } from '../../../queries/client';

interface Props {
  GetPost?: getPost_GetPost;
}

const WritePost = ({ GetPost }: Props) => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
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
  const [editPostMutation] = useMutation<editPost>(EDIT_POST, {
    context: {
      headers: {
        'X-JWT': getAccessToken(),
      },
    },
    onCompleted: ({ EditPost }) => {
      if (EditPost.ok) {
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
  const [deleteTags, setDeleteTags] = useState<number[]>([]);
  const insertTagRef = useRef<HTMLInputElement>();

  const onSubmit = useCallback(() => {
    if (content.trim() && title.trim()) {
      const variables = {
        category,
        title,
        content,
        titleImage: titleImage || undefined,
        deleteTags,
        addTags: tags,
      };
      if (GetPost?.post) {
        editPostMutation({ variables: { ...variables, id: GetPost.post.id } });
      } else {
        writePostMutation({ variables: { ...variables, tags } });
      }
    }
  }, [content, titleImage, title, category, tags, deleteTags, tags]);

  useEffect(() => {
    if (GetPost?.post) {
      const { content, title, titleImage, category, Tags } = GetPost.post;
      setContent(content);
      setTitleImage(titleImage);
      setTitle(title);
      setCategory(category);

      if (Tags.length !== 0) {
        const saveTags = Tags.map((v) => v.name);
        setTags(saveTags);
      }
    }
  }, []);

  useEffect(() => {
    if (!userInfo.isLoggedIn.userName) {
      Router.push('/');
    }
  }, [userInfo]);

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
      const deleteId = GetPost?.post.Tags.find((v) => v.name === tag).id;
      if (deleteId) {
        const newDeleteTags = [...deleteTags, deleteId];
        setDeleteTags(newDeleteTags);
      }
      const newTags = [...tags];
      const removeIndex = newTags.findIndex((v) => v === tag);
      newTags.splice(removeIndex, 1);
      setTags(newTags);
    },
    [tags, deleteTags],
  );

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css" />
        <link rel="stylesheet" href="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/github.min.css"
        />
      </Helmet>
      <PageContainer>
        <BlogWriteHeader>
          <div>
            <span>제목 : </span> <input type="text" onChange={onChangeTitle} value={title} />
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
        <TUIEditor onChange={setContent} setImage={setImage} initialValue={GetPost?.post?.content || ''} />
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
    </>
  );
};

WritePost.getInitialProps = async (context) => {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;
    const { apolloClient } = context;
    const postData = await apolloClient.query({
      query: GET_POST,
      variables: { id: parseInt(id, 10) },
    });
    return postData.data;
  }
};

export default WritePost;
