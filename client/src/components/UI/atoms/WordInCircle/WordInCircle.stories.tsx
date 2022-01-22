import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import WordInCircle from '.';

export default {
  title: 'Atoms/WordInCircle',
  component: WordInCircle,
};

export const Default = () => {
  const value = text('text', '재미');

  return <WordInCircle word={value} />;
};
