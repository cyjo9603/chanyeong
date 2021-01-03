import React, { FC, useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';

import { userInfoVar } from '@store/userInfo';

const auth = (PageComponent: FC<any>): FC<any> => (props) => {
  const userInfo = useReactiveVar(userInfoVar);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo.userName) router.back();
  }, []);

  return <>{userInfo.userName && <PageComponent {...props} />}</>;
};

export default auth;
