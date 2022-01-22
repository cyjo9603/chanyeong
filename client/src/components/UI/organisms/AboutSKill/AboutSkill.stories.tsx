import React from 'react';
import { text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import AboutSkill from '.';

export default {
  title: 'Organisms/AboutSkill',
  component: AboutSkill,
};

const DUMMY_IMG_URL =
  'https://image.toast.com/aaaabcy/skill/1592697411511js.png';

export const UnSignedin = () => {
  const name = text('name', 'JavaScript');
  const description = text('description', 'VanilaJS 및 최신 ES 문법 활용');
  const level = select<number>('ratio', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0);

  return (
    <AboutSkill
      data={{ id: 0, name, description, level, icon: DUMMY_IMG_URL } as any}
    />
  );
};

export const Signedin = () => {
  const name = text('name', 'JavaScript');
  const description = text('description', 'VanilaJS 및 최신 ES 문법 활용');
  const level = select<number>('ratio', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0);
  return (
    <AboutSkill
      data={{ id: 0, name, description, level, icon: DUMMY_IMG_URL } as any}
      onClick={action('onClick')}
    />
  );
};
