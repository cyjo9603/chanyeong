import { initializeApollo } from '@src/apollo';
import { signInUser } from '@store/userInfo';
import { GET_USER_INFO } from '@queries';
import { GetUserInfo } from '@gql-types/api';

const initSigninCheck = async () => {
  const apollo = initializeApollo();
  const { data } =
    (await apollo.query<GetUserInfo>({
      query: GET_USER_INFO,
      fetchPolicy: 'no-cache',
    })) || {};
  if (data?.getUserInfo.ok) {
    const { familyName, givenName } = data.getUserInfo.user;
    signInUser(`${familyName}${givenName}`);
  }
};

export default initSigninCheck;
