import React from 'react';
import { text } from '@storybook/addon-knobs';

import Tag from '.';

export default {
  title: 'Atoms/Tag',
  component: Tag,
};

export const Default = () => {
  const name = text('name', 'default');

  return <Tag name={name} />;
};
