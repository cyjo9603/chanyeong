import React from 'react';
import { text } from '@storybook/addon-knobs';

import MarkDownViewer from '.';

export default {
  title: 'Organisms/MarkDownViewer',
  component: MarkDownViewer,
};

export const Default = () => {
  const content = text('content', '### default');

  return <MarkDownViewer content={content} />;
};
