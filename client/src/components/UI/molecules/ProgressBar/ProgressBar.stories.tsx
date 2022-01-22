import React from 'react';
import { select } from '@storybook/addon-knobs';

import ProgressBar from '.';

export default {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
};

export const Default = () => {
  const ratio = select('ratio', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0);

  return <ProgressBar ratio={ratio} />;
};
