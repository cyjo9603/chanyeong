import React, { FC, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { LOG_OUT, GET_LOCAL_USER } from '@queries/client';
import { clearCookie, getAccessToken } from '@lib/cookie';
import UserStatusNavPresenter from './UserStatusNavPresenter';

const HIDDEN_STATUSBAR = 0.3 as const;

interface Props {
  scrollRatio: number;
}

const Header: FC<Props> = ({ scrollRatio }) => {
  const { data } = useQuery(GET_LOCAL_USER);
  const [logoutMutation] = useMutation(LOG_OUT);
  const hidden = useMemo(() => scrollRatio > HIDDEN_STATUSBAR, [scrollRatio]);

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
      hidden={hidden}
      onClickLogout={onClickLogout}
    />
  );
};

export default Header;
