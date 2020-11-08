import React from 'react';
import { text } from '@storybook/addon-knobs';

import BreadCrumbs from '.';

export default {
  title: 'Molecules/BreadCrumbs',
  component: BreadCrumbs,
};

export const Default = () => {
  const pageName = text('pageName', 'pageName');
  return (
    <BreadCrumbs
      data={[{ name: pageName, path: '' }, { name: 'page2' }] as any}
      page={pageName}
    />
  );
};
