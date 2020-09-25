import { Cookies } from 'react-cookie';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@src/secret';
import { encryptValue, decryptValue } from './crypto';

interface SetTokenProps {
  accessToken: string;
  refreshToken: string;
}

const cookies = new Cookies();

export const getAccessToken = () => {
  const token = cookies.get(ACCESS_TOKEN);
  return token ? encryptValue(token) : '';
};
export const getRefreshToken = () => {
  const token = cookies.get(REFRESH_TOKEN);
  return token ? encryptValue(token) : '';
};

export const setAccessToken = (token) => cookies.set(ACCESS_TOKEN, decryptValue(token), { path: '/' });

export const setToken = ({ accessToken, refreshToken }: SetTokenProps) => {
  cookies.set(ACCESS_TOKEN, decryptValue(accessToken), { path: '/' });
  cookies.set(REFRESH_TOKEN, decryptValue(refreshToken), { path: '/' });
};

export const clearCookie = () => {
  cookies.remove(ACCESS_TOKEN);
  cookies.remove(REFRESH_TOKEN);
};
