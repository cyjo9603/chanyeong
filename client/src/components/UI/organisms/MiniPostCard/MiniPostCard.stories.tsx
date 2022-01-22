import React from 'react';
import { text } from '@storybook/addon-knobs';

import MiniPostCard from '.';

export default {
  title: 'Organisms/MiniPostCard',
  component: MiniPostCard,
};

export const Default = () => {
  const title = text('title', 'title');
  const content = text('content', 'content');
  return <MiniPostCard data={{ titleImage: 'test', title, content } as any} />;
};
