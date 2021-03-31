import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import useChangeEvent from '@hooks/useChangeEvent';

import BorderInput from '.';

export default {
  title: 'Molecules/BorderInput',
  component: BorderInput,
};

export const Default = () => {
  const [value, , onChange] = useChangeEvent('');
  const type = select('type', ['text', 'password'], 'text');
  const placeholder = text('placeholder', 'default');

  return <BorderInput value={value} onChange={onChange} placeholder={placeholder} type={type} />;
};
