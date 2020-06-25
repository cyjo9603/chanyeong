import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import { Helmet } from 'react-helmet';

import PageContainer from '../../component/pageContainer';
import Input from '../../component/Input';
import { SignInWrapper } from './styled';
import { signIn } from '../../types/api';
import { SIGNIN_REQUEST } from '../../queries/user.queries';
import { setToken } from '../../lib/cookie';
import { encryptValue } from '../../lib/encrypt';
import { LOCAL_SIGN_IN } from '../../queries/client';

const SignIn = () => {
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
    <>
      <Helmet>
        <title>로그인 :: chanyeong</title>
      </Helmet>
      <PageContainer>
        <SignInWrapper>
          <form onSubmit={onSubmit}>
            <Input placeholder="아이디" value={userId} onChange={onChangeUserId} />
            <Input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
            <button>로그인</button>
          </form>
        </SignInWrapper>
      </PageContainer>
    </>
  );
};

export default SignIn;
