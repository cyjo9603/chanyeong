import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import DarkModeButton from '.';

export default {
  title: 'Molecules/DarkModeButton',
  component: DarkModeButton,
};

export const Default = () => {
  const isDarkMode = boolean('darkmode', false);
  return <DarkModeButton isDarkMode={isDarkMode} onClick={action('onClick')} />;
};
