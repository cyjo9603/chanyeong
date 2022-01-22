import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { NextPage } from 'next';

import auth from '@hoc/auth';
import useChangeEvent from '@src/hooks/useChangeEvent';
import { WRITE_POST, EDIT_POST } from '@queries';
import { WritePost, GetPost_getPost_post as Post, EditPost } from '@gql-types/api';
import WritePostPresenter from './WritePostPresenter';

interface Props {
  post?: Post;
}

const WritePostContainer: NextPage<Props> = auth(({ post }) => {
  const router = useRouter();
  const [content, setContent] = useState(post?.content || '');
  const [image, setImage] = useState('');
  const [titleImage, setTitleImage] = useState(post?.titleImage || '');
  const [title, , onChangeTitle] = useChangeEvent(post?.title || '');
  const [category, , onChangeCategory] = useChangeEvent<HTMLSelectElement>(post?.category || 'DEV');
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
      };
      if (isWrite) {
        return { ...variables, tags };
      }
      return { ...variables, id: post?.id || 0, deleteTags, addTags: tags };
    },
    [content, titleImage, title, category, tags, deleteTags, tags],
  );

  const [writePostMutation] = useMutation<WritePost>(WRITE_POST, {
    variables: { input: getVariables(true) },
    onCompleted: async ({ writePost }) => {
      if (writePost.ok) {
        router.push('/blog');
      }
    },
  });
  const [editPostMutation] = useMutation<EditPost>(EDIT_POST, {
    variables: { input: getVariables(false) },
    onCompleted: async ({ editPost }) => {
      if (editPost.ok) {
        router.push('/blog');
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
      const { tags } = post;

      if (tags.length !== 0) {
        const saveTags = tags.map((v) => v.name);
        setTags(saveTags);
      }
    }
  }, []);

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
      const deleteId = post?.tags.find((v) => v.name === tag).id;
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
});

export default WritePostContainer;
