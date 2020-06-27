import { Cookies } from 'react-cookie';

import { encryptValue, decryptValue } from './encrypt';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../secret';

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

export const setAccessToken = (token) => cookies.set(ACCESS_TOKEN, decryptValue(token));

export const setToken = ({ accessToken, refreshToken }: SetTokenProps) => {
  cookies.set(ACCESS_TOKEN, decryptValue(accessToken));
  cookies.set(REFRESH_TOKEN, decryptValue(refreshToken));
};

export const clearCookie = () => {
  cookies.remove(ACCESS_TOKEN);
  cookies.remove(REFRESH_TOKEN);
};
