import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import useChangeEvent from '@lib/useChangeEvent';

import TransparentInput from '.';

export default {
  title: 'Atoms/TransparentInput',
  component: TransparentInput,
};

export const Default = () => {
  const [value, , onChange] = useChangeEvent<HTMLInputElement>('');
  const type = select('type', ['text', 'password'], 'text');
  const placeholder = text('placeholder', 'default');

  return (
    <TransparentInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
};
