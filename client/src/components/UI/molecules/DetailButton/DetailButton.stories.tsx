import React from 'react';
import { text } from '@storybook/addon-knobs';

import DetailButton from '.';

export default {
  title: 'Molecules/DetailButton',
  component: DetailButton,
};

export const LightMode = () => {
  const title = text('text', '프로젝트');
  return <DetailButton title={title} link={'/'} />;
};
