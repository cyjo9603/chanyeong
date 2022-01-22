import { makeVar } from '@apollo/client';

interface UserInfo {
  userName?: string;
}

export const userInfoVar = makeVar<UserInfo>({});

export const signInUser = (userName: string) => {
  userInfoVar({ userName });
};

export const logoutUser = () => {
  userInfoVar({});
};
