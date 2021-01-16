import React, { FC, useCallback } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';

import { userInfoVar, logoutUser } from '@store/userInfo';
import { LOG_OUT } from '@queries';
import { LogOut } from '@gql-types/api';
import UserStatusNavPresenter from './UserStatusNavPresenter';

interface Props {
  statusHidden: boolean;
}

const Header: FC<Props> = ({ statusHidden }) => {
  const userInfo = useReactiveVar(userInfoVar);
  const [logoutMutation] = useMutation<LogOut>(LOG_OUT, {
    onCompleted: ({ logout }) => {
      if (logout.ok) {
        logoutUser();
      }
    },
  });

  const onClickLogout = useCallback(() => {
    logoutMutation();
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
