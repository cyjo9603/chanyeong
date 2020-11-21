import React from 'react';
import { text } from '@storybook/addon-knobs';

import HugeText from '.';

export default {
  title: 'Atoms/HugeText',
  component: HugeText,
};

export const Default = () => {
  const value = text('text', 'default');

  return <HugeText text={value} />;
};
