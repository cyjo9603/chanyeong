import React, { FC, useCallback } from 'react';
import { useReactiveVar } from '@apollo/client';

import { userInfoVar, logoutUser } from '@store/userInfo';
import UserStatusNavPresenter from './UserStatusNavPresenter';

interface Props {
  statusHidden: boolean;
}

const Header: FC<Props> = ({ statusHidden }) => {
  const userInfo = useReactiveVar(userInfoVar);

  const onClickLogout = useCallback(() => {
    logoutUser();
  }, []);

  return (
    <UserStatusNavPresenter
      userName={userInfo.userName}
      statusHidden={statusHidden}
      onClickLogout={onClickLogout}
    />
  );
};

export default Header;
