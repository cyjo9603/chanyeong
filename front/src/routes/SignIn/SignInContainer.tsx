import React, { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';

import SignInPresenter from './SignInPresenter';
import { signIn } from '../../types/api';
import { SIGNIN_REQUEST } from '../../queries/user.queries';
import { setToken } from '../../lib/cookie';
import { encryptValue } from '../../lib/encrypt';
import useChangeEvent from '../../lib/useChangeEvent';
import { LOCAL_SIGN_IN } from '../../queries/client';

const SignInContainer = () => {
  const [userId, , onChangeUserId] = useChangeEvent<HTMLInputElement>('');
  const [password, , onChangePassword] = useChangeEvent<HTMLInputElement>('');
  const [localSignIn] = useMutation(LOCAL_SIGN_IN);
  const [signInMutation] = useMutation<signIn>(SIGNIN_REQUEST, {
    onCompleted: ({ SignIn }) => {
      if (SignIn.token && SignIn.userName) {
        setToken(SignIn.token);
        localSignIn({
          variables: {
            userName: SignIn.userName,
          },
        });
        Router.push('/');
      }
    },
  });

  useEffect(() => {
    const loginKey = localStorage.getItem('LOGIN_KEY');
    if (process.env.LOGIN_KEY !== loginKey) {
      Router.push('/');
    }
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cryptoUserId = encryptValue(userId);
      const cryptoPassword = encryptValue(password);
      signInMutation({
        variables: {
          userId: cryptoUserId,
          password: cryptoPassword,
        },
      });
    },
    [userId, password],
  );

  return (
    <SignInPresenter
      userId={userId}
      password={password}
      onChangeUserId={onChangeUserId}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
    />
  );
};

export default SignInContainer;