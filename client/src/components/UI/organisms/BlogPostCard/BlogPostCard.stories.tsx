import React from 'react';
import { text, select, array } from '@storybook/addon-knobs';

import BlogPostCard from '.';

export default {
  title: 'Organisms/BlogPostCard',
  component: BlogPostCard,
};

const tags = [
  { id: '1', name: '가나' },
  { id: '2', name: '다라마' },
  { id: '3', name: '바' },
  { id: '4', name: '아자차카' },
];

export const Default = () => {
  const title = text('title', 'title');
  const content = text('content', 'content');
  const category = select('category', ['DEV', 'DAIRY'], 'DEV');
  return (
    <BlogPostCard
      data={
        {
          id: 1,
          title,
          category,
          createdAt: new Date(),
          content: content.repeat(100),
          titleImage: 'test',
          Tags: tags,
        } as any
      }
    />
  );
};
