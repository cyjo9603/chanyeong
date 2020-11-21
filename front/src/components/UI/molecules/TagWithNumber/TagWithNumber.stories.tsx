import React from 'react';
import { text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import TagWithNumber from '.';

export default {
  title: 'Molecules/TagWithNumber',
  component: TagWithNumber,
};

export const Default = () => {
  const name = text('name', 'tagName');
  const count = number('tag count', 0);

  return (
    <TagWithNumber data={{ name, count } as any} onClick={action('click')} />
  );
};
