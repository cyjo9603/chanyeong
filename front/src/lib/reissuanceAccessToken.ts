import { getRefreshToken, setAccessToken } from './cookie';
import { REISSUANCE_ACCESS_TOKEN } from '../queries/user.queries';

export const ERROR_EXPIRATION = 'ERROR_EXPIRATION' as const;

export const reissuanceAccessToken = async (apollo) => {
  const refreshToken = getRefreshToken();
  const { data } = await apollo.mutate({
    mutation: REISSUANCE_ACCESS_TOKEN,
    variables: { refreshToken },
  });
  if (data?.ReissuanceAccessToken.ok) {
    const { token } = data.ReissuanceAccessToken;
    setAccessToken(token);
    return token;
  }
  return false;
};
