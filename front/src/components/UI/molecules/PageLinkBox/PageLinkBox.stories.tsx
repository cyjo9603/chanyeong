import React from 'react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import PageLinkBox from '.';

export default {
  title: 'Molecules/PageLinkBox',
  component: PageLinkBox,
};

export const Default = () => {
  const txt = text('text', 'default');
  const link = text('link', 'default');

  return <PageLinkBox text={txt} link={link} onClick={action('onClick')} />;
};
