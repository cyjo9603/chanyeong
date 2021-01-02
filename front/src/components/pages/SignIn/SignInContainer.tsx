import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Router from 'next/router';

import useChangeEvent from '@src/hooks/useChangeEvent';
import { encryptValue } from '@lib/crypto';
import { LOCAL_SIGN_IN } from '@queries/client';
import { SIGNIN_REQUEST } from '@queries/user.queries';
import { signIn } from '@gql-types/api';
import SignInPresenter from './SignInPresenter';

const SignInContainer = () => {
  const [userId, , onChangeUserId] = useChangeEvent('');
  const [password, , onChangePassword] = useChangeEvent('');
  const [hasIdAndPassword, setHasIdAndPassword] = useState(false);
  const [localSignIn] = useMutation(LOCAL_SIGN_IN);
  const [signInMutation] = useMutation<signIn>(SIGNIN_REQUEST, {
    onCompleted: ({ SignIn }) => {
      if (SignIn.ok && SignIn.userName) {
        localSignIn({
          variables: {
            userName: SignIn.userName,
          },
        });
        Router.push('/');
        return;
      }
      alert('아이디나 비밀번호가 올바르지 않습니다');
    },
  });

  useEffect(() => {
    if (!hasIdAndPassword && userId && password) {
      setHasIdAndPassword(true);
    } else if (hasIdAndPassword && (!userId || !password)) {
      setHasIdAndPassword(false);
    }
  }, [hasIdAndPassword, userId, password]);

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
      hasIdAndPassword={hasIdAndPassword}
      onChangeUserId={onChangeUserId}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
    />
  );
};

export default SignInContainer;
