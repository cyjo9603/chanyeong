import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import Title, { DEFAULT_SIZE, SMALL_SIZE } from '.';

export default {
  title: 'Atoms/Title',
  component: Title,
};

export const Default = () => {
  const value = text('text', 'default');
  const align = select('align', ['left', 'right', 'center'], 'left');
  const size = select('size', [DEFAULT_SIZE, SMALL_SIZE], DEFAULT_SIZE);

  return <Title text={value} align={align} size={size} />;
};
