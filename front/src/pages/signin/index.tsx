import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Cookies } from 'react-cookie';
import Router from 'next/router';

import PageContainer from '../../component/pageContainer';
import Input from '../../component/Input';
import { SignInWrapper } from './styled';
import { signIn } from '../../types/api';
import { SIGNIN_REQUEST } from './SignIn.queries';

const SignIn = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [signInMutation] = useMutation<signIn>(SIGNIN_REQUEST, {
    variables: { userId, password },
    onCompleted: ({ SignIn }) => {
      if (SignIn.token) {
        const cookies = new Cookies();
        const { refreshToken, accessToken } = SignIn.token;
        cookies.set('crt', refreshToken);
        cookies.set('cat', accessToken);
      }
    },
  });

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await signInMutation();
    Router.push('/');
  }, []);

  const onChangeUserId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  return (
    <PageContainer>
      <SignInWrapper>
        <form onSubmit={onSubmit}>
          <Input placeholder="아이디" value={userId} onChange={onChangeUserId} />
          <Input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
          <button>로그인</button>
        </form>
      </SignInWrapper>
    </PageContainer>
  );
};

export default SignIn;
