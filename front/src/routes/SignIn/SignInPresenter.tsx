import React from 'react';
import { Helmet } from 'react-helmet';

import PageContainer from '../../component/pageContainer';
import Input from '../../commons/Input';
import { SignInWrapper } from './styled';

interface Props {
  userId: string;
  password: string;
  onChangeUserId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SignInPresenter = ({ userId, password, onChangeUserId, onChangePassword, onSubmit }: Props) => (
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

export default SignInPresenter;
