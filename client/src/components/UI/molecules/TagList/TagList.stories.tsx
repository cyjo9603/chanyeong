import React from 'react';
import { number } from '@storybook/addon-knobs';

import TagList from '.';

export default {
  title: 'Molecules/TagList',
  component: TagList,
};

const tags = [
  { id: '1', name: '가나' },
  { id: '2', name: '다라마' },
  { id: '3', name: '바' },
  { id: '4', name: '아자차카' },
];

export const Default = () => <TagList postId={1} tags={tags as any} />;

export const Response = () => (
  <TagList postId={1} tags={tags as any} responsive />
);
