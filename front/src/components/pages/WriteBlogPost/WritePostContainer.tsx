import React, { useState, useCallback, useRef, useEffect } from 'react';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { useReissueMutation } from '@hooks/useApollo';
import useChangeEvent from '@src/hooks/useChangeEvent';
import { GET_LOCAL_USER } from '@queries/client';
import { WRITE_POST, GET_POST, EDIT_POST } from '@queries/post.queries';
import { writePost, getPost_GetPost_post, editPost } from '@gql-types/api';
import WritePostPresenter from './WritePostPresenter';

interface Props {
  post?: getPost_GetPost_post;
}

const WritePostContainer = ({ post }: Props) => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const [content, setContent] = useState(post?.content || '');
  const [image, setImage] = useState('');
  const [titleImage, setTitleImage] = useState(post?.titleImage || '');
  const [title, , onChangeTitle] = useChangeEvent(post?.title || '');
  const [category, , onChangeCategory] = useChangeEvent<HTMLSelectElement>(
    post?.category || 'DEV',
  );
  const [tags, setTags] = useState<string[]>([]);
  const [insertTag, , onChangeInsertTag] = useChangeEvent('');
  const [deleteTags, setDeleteTags] = useState<number[]>([]);
  const insertTagRef = useRef<HTMLInputElement>();

  const getVariables = useCallback(
    (isWrite: boolean) => {
      const variables = {
        category,
        title,
        content,
        titleImage: titleImage || undefined,
        deleteTags,
        addTags: tags,
      };
      if (!isWrite) {
        return { ...variables, id: post?.id || 0 };
      }
      return { ...variables, tags };
    },
    [content, titleImage, title, category, tags, deleteTags, tags],
  );

  const [writePostMutation] = useReissueMutation<writePost>(WRITE_POST, {
    variables: getVariables(false),
    onCompleted: async ({ WritePost }) => {
      if (WritePost.ok) {
        Router.push('/blog');
      }
    },
  });
  const [editPostMutation] = useReissueMutation<editPost>(EDIT_POST, {
    variables: getVariables(true),
    onCompleted: async ({ EditPost }) => {
      if (EditPost.ok) {
        Router.push('/blog');
      }
    },
  });

  const onSubmit = useCallback(() => {
    if (content.trim() && title.trim()) {
      if (post) {
        editPostMutation();
        return;
      }
      writePostMutation();
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
    (tag: string) => {
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
    <WritePostPresenter
      title={title}
      post={post}
      insertTagRef={insertTagRef}
      tags={tags}
      setContent={setContent}
      setImage={setImage}
      addTag={addTag}
      removeTag={removeTag}
      onChangeTitle={onChangeTitle}
      onChangeCategory={onChangeCategory}
      onChangeInsertTag={onChangeInsertTag}
      onSubmit={onSubmit}
    />
  );
};

WritePostContainer.getInitialProps = async (context) => {
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

export default WritePostContainer;
