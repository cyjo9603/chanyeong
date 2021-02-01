import React from 'react';
import { Helmet } from 'react-helmet';
import { Control, Controller } from 'react-hook-form';

import RowFrame from '@frames/RowFrame';
import BorderInput from '@molecules/BorderInput';
import FullButton from '@atoms/FullButton';
import styled from '@theme/styled';

interface Props {
  control: Control<Record<string, any>>;
  hasIdAndPassword: boolean;
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

const SignInPresenter = ({ control, hasIdAndPassword, onSubmit }: Props) => (
  <>
    <Helmet>
      <title>로그인 :: chanyeong</title>
    </Helmet>
    <RowFrame>
      <StyledSignIn>
        <form onSubmit={onSubmit}>
          <Controller
            name="userId"
            control={control}
            rules={{ required: true }}
            render={({ onChange, value }) => (
              <BorderInput placeholder="아이디" value={value} onChange={onChange} />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ onChange, value }) => (
              <BorderInput
                type="password"
                placeholder="비밀번호"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <FullButton disabled={!hasIdAndPassword} text="로그인" />
        </form>
      </StyledSignIn>
    </RowFrame>
  </>
);

export default SignInPresenter;
