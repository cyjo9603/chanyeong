import React from 'react';
import { Helmet } from 'react-helmet';

import RowFrame from '@frames/RowFrame';
import BorderInput from '@molecules/BorderInput';
import FullButton from '@atoms/FullButton';
import styled from '@theme/styled';

interface Props {
  userId: string;
  password: string;
  hasIdAndPassword: boolean;
  onChangeUserId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const StyledSignIn = styled.section`
  display: flex;
  margin-top: 100px;
  justify-content: center;

  & > form {
    width: 500px;
    padding: 100px 80px;
    border: 1px solid ${(props) => props.theme.BORDER_LINE_GREY};

    & > div {
      margin-bottom: 10px;
    }
  }
`;

const SignInPresenter = ({
  userId,
  password,
  hasIdAndPassword,
  onChangeUserId,
  onChangePassword,
  onSubmit,
}: Props) => (
  <>
    <Helmet>
      <title>로그인 :: chanyeong</title>
    </Helmet>
    <RowFrame>
      <StyledSignIn>
        <form onSubmit={onSubmit}>
          <BorderInput
            placeholder="아이디"
            value={userId}
            onChange={onChangeUserId}
          />
          <BorderInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChangePassword}
          />
          <FullButton disabled={!hasIdAndPassword} text="로그인" />
        </form>
      </StyledSignIn>
    </RowFrame>
  </>
);

export default SignInPresenter;
