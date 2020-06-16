import { Cookies } from 'react-cookie';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../secret';

interface SetTokenProps {
  accessToken: string;
  refreshToken: string;
}

const cookies = new Cookies();

export const getAccessToken = () => cookies.get(ACCESS_TOKEN) || '';
export const getRefreshToken = () => cookies.get(REFRESH_TOKEN) || '';

export const setAccessToken = (token) => cookies.set(ACCESS_TOKEN, token);

export const setToken = ({ accessToken, refreshToken }: SetTokenProps) => {
  cookies.set(ACCESS_TOKEN, accessToken);
  cookies.set(REFRESH_TOKEN, refreshToken);
};

export const clearCookie = () => {
  cookies.remove(ACCESS_TOKEN);
  cookies.remove(REFRESH_TOKEN);
};
