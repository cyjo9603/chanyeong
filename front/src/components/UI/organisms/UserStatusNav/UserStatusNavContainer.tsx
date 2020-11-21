import React, { FC, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { LOG_OUT, GET_LOCAL_USER } from '@queries/client';
import { clearCookie, getAccessToken } from '@lib/cookie';
import UserStatusNavPresenter from './UserStatusNavPresenter';

interface Props {
  statusHidden: boolean;
}

const Header: FC<Props> = ({ statusHidden }) => {
  const { data } = useQuery(GET_LOCAL_USER);
  const [logoutMutation] = useMutation(LOG_OUT);

  const onClickLogout = useCallback(() => {
    logoutMutation({
      context: {
        headers: {
          'X-JWT': getAccessToken(),
        },
      },
    });
    clearCookie();
  }, [getAccessToken()]);

  return (
    <UserStatusNavPresenter
      userName={data?.isLoggedIn.userName}
      statusHidden={statusHidden}
      onClickLogout={onClickLogout}
    />
  );
};

export default Header;
