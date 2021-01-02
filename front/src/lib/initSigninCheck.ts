/* eslint-disable @typescript-eslint/no-use-before-define */
import { ApolloClient } from '@apollo/client';

import { signInUser } from '@store/userInfo';
import { REISSUANCE_ACCESS_TOKEN, GET_USER_INFO } from '@queries/user.queries';
import { reissuanceAccessToken, getUserInfo } from '@gql-types/api';

const initSigninCheck = async (apollo: ApolloClient<object>) => {
  try {
    await signinCheck();
  } catch (error) {
    await errorHanler(error).catch((err) => console.error(err));
  }

  async function signinCheck() {
    const { data } = await apollo.query<getUserInfo>({
      query: GET_USER_INFO,
      fetchPolicy: 'no-cache',
    });
    if (data.GetUserInfo.ok) {
      const { familyName, givenName } = data.GetUserInfo.user;
      signInUser(`${familyName}${givenName}`);
    }
  }

  async function errorHanler(error) {
    const { statusCode } = error.networkError || {};
    if (statusCode !== 401) {
      return;
    }

    const { data } = await apollo.mutate<reissuanceAccessToken>({
      mutation: REISSUANCE_ACCESS_TOKEN,
    });

    if (data.ReissuanceAccessToken.ok) {
      await signinCheck();
    }
  }
};

export default initSigninCheck;
