import React, { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { signInUser } from '@store/userInfo';
import { encryptValue } from '@lib/crypto';
import { SIGNIN_REQUEST } from '@queries';
import { SignIn } from '@gql-types/api';
import SignInPresenter from './SignInPresenter';

const SignInContainer = () => {
  const router = useRouter();
  const { handleSubmit, control, watch } = useForm();
  const [signInMutation] = useMutation<SignIn>(SIGNIN_REQUEST, {
    onCompleted: ({ signin }) => {
      if (signin.ok && signin.userName) {
        signInUser(signin.userName);
        router.back();
        return;
      }
      alert('아이디나 비밀번호가 올바르지 않습니다');
    },
  });

  const onSubmit = useCallback((values: any) => {
    const cryptoUserId = encryptValue(values.userId);
    const cryptoPassword = encryptValue(values.password);
    signInMutation({ variables: { input: { userId: cryptoUserId, password: cryptoPassword } } });
  }, []);

  return (
    <SignInPresenter
      control={control}
      hasIdAndPassword={watch('userId') && watch('password')}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default SignInContainer;
