import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import UserStatusNav from './UserStatusNavPresenter';

export default {
  title: 'Organisms/UserStatusNav',
  component: UserStatusNav,
};

export const UnSignedIn = () => {
  const statusHidden = boolean('hidden', false);

  return (
    <UserStatusNav
      statusHidden={statusHidden}
      onClickLogout={action('logout')}
    />
  );
};

export const SignedIn = () => {
  const name = text('name', '조찬영');
  const statusHidden = boolean('hidden', false);

  return (
    <UserStatusNav
      statusHidden={statusHidden}
      userName={name}
      onClickLogout={action('logout')}
    />
  );
};
