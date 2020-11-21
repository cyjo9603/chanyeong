import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import SubTitle, { SUBTITLE_WEIGHT_DEFAULT, SUBTITLE_WEIGHT_BOLD } from '.';

export default {
  title: 'Atoms/SubTitle',
  component: SubTitle,
};

export const Default = () => {
  const value = text('text', 'default');
  const align = select('align', ['left', 'right', 'center'], 'left');
  const weight = select(
    'weight',
    [SUBTITLE_WEIGHT_DEFAULT, SUBTITLE_WEIGHT_BOLD],
    SUBTITLE_WEIGHT_DEFAULT,
  );

  return <SubTitle text={value} weight={weight} align={align} />;
};
