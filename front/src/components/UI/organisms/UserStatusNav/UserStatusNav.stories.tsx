import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import UserStatusNav from './UserStatusNavPresenter';

export default {
  title: 'Organisms/UserStatusNav',
  component: UserStatusNav,
};

export const UnSignedIn = () => {
  const hidden = boolean('hidden', false);

  return <UserStatusNav hidden={hidden} onClickLogout={action('logout')} />;
};

export const SignedIn = () => {
  const name = text('name', '조찬영');
  const hidden = boolean('hidden', false);

  return (
    <UserStatusNav
      hidden={hidden}
      userName={name}
      onClickLogout={action('logout')}
    />
  );
};
