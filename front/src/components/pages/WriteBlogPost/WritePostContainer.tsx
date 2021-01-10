import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { NextPage } from 'next';

import auth from '@hoc/auth';
import useChangeEvent from '@src/hooks/useChangeEvent';
import { WRITE_POST, EDIT_POST } from '@queries/post.queries';
import { writePost, getPost_GetPost_post as Post, editPost } from '@gql-types/api';
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
        deleteTags,
        addTags: tags,
      };
      if (!isWrite) {
        return { ...variables, tags };
      }
      return { ...variables, id: post?.id || 0 };
    },
    [content, titleImage, title, category, tags, deleteTags, tags],
  );

  const [writePostMutation] = useMutation<writePost>(WRITE_POST, {
    variables: getVariables(false),
    onCompleted: async ({ WritePost }) => {
      if (WritePost.ok) {
        router.push('/blog');
      }
    },
  });
  const [editPostMutation] = useMutation<editPost>(EDIT_POST, {
    variables: getVariables(true),
    onCompleted: async ({ EditPost }) => {
      if (EditPost.ok) {
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
      const { Tags } = post;

      if (Tags.length !== 0) {
        const saveTags = Tags.map((v) => v.name);
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
});

export default WritePostContainer;
