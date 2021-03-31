import React, { FormEvent } from 'react';
import { action } from '@storybook/addon-actions';

import useChangeEvent from '@hooks/useChangeEvent';

import Search from '.';

export default {
  title: 'Molecules/Search',
  component: Search,
};

export const Default = () => {
  const [value, , onChange] = useChangeEvent('');

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    action('onSearch')();
  };

  return <Search value={value} onChange={onChange} onSearch={onSearch} />;
};
