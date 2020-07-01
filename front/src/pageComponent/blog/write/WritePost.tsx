import React, { useState, useCallback, useRef, useEffect } from 'react';
import Router from 'next/router';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';

import PageContainer from '../../../component/pageContainer';
import TUIEditor from '../../../component/TUIEditor';
import Tag from '../../../component/Tag';
import { BlogWriteHeader, BlogWriteBottom } from './styled';
import { WRITE_POST, GET_POST, EDIT_POST } from '../../../queries/post.queries';
import { getAccessToken } from '../../../lib/cookie';
import { reissuanceAccessToken, ERROR_EXPIRATION } from '../../../lib/reissuanceAccessToken';
import { writePost, getPost_GetPost_post, editPost } from '../../../types/api';
import { GET_LOCAL_USER } from '../../../queries/client';

interface Props {
  post?: getPost_GetPost_post;
}

const useInput = <T extends { value: string }>(initValue: string): [string, (e: React.ChangeEvent<T>) => void] => {
  const [value, setValue] = useState(initValue);

  const onChangeValue = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeValue];
};

const WritePost = ({ post }: Props) => {
  const apollo = useApolloClient();
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const [content, setContent] = useState(post?.content || '');
  const [image, setImage] = useState('');
  const [titleImage, setTitleImage] = useState(post?.titleImage || '');
  const [title, setTitle] = useInput<HTMLInputElement>(post?.title || '');
  const [category, setCategory] = useInput<HTMLSelectElement>(post?.category || 'DEV');
  const [tags, setTags] = useState<string[]>([]);
  const [insertTag, setInsertTag] = useInput<HTMLInputElement>('');
  const [deleteTags, setDeleteTags] = useState<number[]>([]);
  const insertTagRef = useRef<HTMLInputElement>();
  const [writePostMutation] = useMutation<writePost>(WRITE_POST, {
    context: {
      headers: {
        'X-JWT': getAccessToken(),
      },
    },
    onCompleted: async ({ WritePost }) => {
      if (WritePost.error === ERROR_EXPIRATION) {
        const token = await reissuanceAccessToken(apollo);
        if (token) {
          const variables = {
            category,
            title,
            content,
            titleImage: titleImage || undefined,
            tags,
          };
          writePostMutation({ variables, context: { headers: { 'X-JWT': token } } });
        }
      }
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
    onCompleted: async ({ EditPost }) => {
      if (EditPost.error === ERROR_EXPIRATION) {
        const token = await reissuanceAccessToken(apollo);
        if (token) {
          const variables = {
            id: post?.id,
            category,
            title,
            content,
            titleImage: titleImage || undefined,
            deleteTags,
            addTags: tags,
          };
          editPostMutation({ variables, context: { headers: { 'X-JWT': token } } });
        }
      }
      if (EditPost.ok) {
        Router.push('/blog');
      }
    },
  });

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
      if (post) {
        editPostMutation({ variables: { ...variables, id: post.id } });
      } else {
        writePostMutation({ variables: { ...variables, tags } });
      }
    }
  }, [content, titleImage, title, category, tags, deleteTags, tags]);

  useEffect(() => {
    if (post) {
      const { Tags } = post;

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
      const deleteId = post?.Tags.find((v) => v.name === tag).id;
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
    <PageContainer>
      <BlogWriteHeader>
        <div>
          <span>제목 : </span> <input type="text" onChange={setTitle} value={title} />
        </div>
        <div>
          <span>카테고리 : </span>
          <select onChange={setCategory}>
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
            <input type="text" onChange={setInsertTag} ref={insertTagRef} />
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
};

WritePost.getInitialProps = async (context) => {
  if (context.query.id && typeof context.query.id === 'string') {
    const { id } = context.query;
    const { apolloClient } = context;
    const postData = await apolloClient.query({
      query: GET_POST,
      variables: { id: parseInt(id, 10) },
    });
    return postData.data?.GetPost;
  }
};

export default WritePost;
