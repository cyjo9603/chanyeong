/* eslint-disable @typescript-eslint/no-use-before-define */
import ApolloClient, { ApolloError } from 'apollo-client';
import { REISSUANCE_ACCESS_TOKEN, GET_USER_INFO } from '@queries/user.queries';

import { reissuanceAccessToken, getUserInfo } from '@gql-types/api';

const initSigninCheck = async (apollo: ApolloClient<any>) => {
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
      apollo.cache.writeData({
        data: {
          isLoggedIn: {
            __typename: 'IsLoggedIn',
            userName: `${familyName}${givenName}`,
          },
        },
      });
    }
  }

  async function errorHanler(error) {
    const { statusCode } = error.networkError;
    if (statusCode !== 401) {
      console.error(error);
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
