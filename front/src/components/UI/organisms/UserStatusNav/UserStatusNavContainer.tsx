import React, { FC, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { useReissueMutation } from '@hooks/useApollo';
import { LOG_OUT, GET_LOCAL_USER } from '@queries/client';
import UserStatusNavPresenter from './UserStatusNavPresenter';

interface Props {
  statusHidden: boolean;
}

const Header: FC<Props> = ({ statusHidden }) => {
  const { data } = useQuery(GET_LOCAL_USER);
  const [logoutMutation] = useReissueMutation(LOG_OUT);

  const onClickLogout = useCallback(() => {
    logoutMutation();
  }, []);

  return (
    <UserStatusNavPresenter
      userName={data?.isLoggedIn.userName}
      statusHidden={statusHidden}
      onClickLogout={onClickLogout}
    />
  );
};

export default Header;
