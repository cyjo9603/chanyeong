import React, { FC, useCallback } from 'react';
import { useReactiveVar } from '@apollo/client';

import { userInfoVar, logoutUser } from '@store/userInfo';
import { useReissueMutation } from '@hooks/useApollo';
import { LOG_OUT } from '@queries/user.queries';
import { LogOut } from '@gql-types/api';
import UserStatusNavPresenter from './UserStatusNavPresenter';

interface Props {
  statusHidden: boolean;
}

const Header: FC<Props> = ({ statusHidden }) => {
  const userInfo = useReactiveVar(userInfoVar);
  const [logoutMutation] = useReissueMutation<LogOut>(LOG_OUT, {
    onCompleted: ({ LogOut }) => {
      if (LogOut.ok) {
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
