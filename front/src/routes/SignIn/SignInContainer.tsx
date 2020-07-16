import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';

import SignInPresenter from './SignInPresenter';
import { signIn } from '../../types/api';
import { SIGNIN_REQUEST } from '../../queries/user.queries';
import { setToken } from '../../lib/cookie';
import { encryptValue } from '../../lib/encrypt';
import { LOCAL_SIGN_IN } from '../../queries/client';

const SignInContainer = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
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

  const onChangeUserId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

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
