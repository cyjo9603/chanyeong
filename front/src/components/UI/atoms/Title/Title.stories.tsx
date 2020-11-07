import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import Title from '.';

export default {
  title: 'Atoms/Title',
  component: Title,
};

export const Default = () => {
  const value = text('text', 'default');
  const align = select('align', ['left', 'right', 'center'], 'left');

  return <Title text={value} align={align} />;
};
