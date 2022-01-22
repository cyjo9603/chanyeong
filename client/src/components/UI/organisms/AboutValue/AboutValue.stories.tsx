import React from 'react';
import { text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import AboutValue from '.';

export default {
  title: 'Organisms/AboutValue',
  component: AboutValue,
};

export const Default = () => {
  const engTitle = text('english title', 'Fun');
  const korTitle = text('koran title', '재미');
  const content = text(
    'content',
    '저는 개발을 좋아합니다. 누군가 가장 좋아하는 취미를 물어본다면 고민없이 개발이라고 얘기할 것입니다. 이 마음가짐을 꾸준히 가지고 항상 즐기며 개발을 하겠습니다.',
  );

  return (
    <AboutValue engTitle={engTitle} korTitle={korTitle} content={content} />
  );
};
