import { initializeApollo } from '@src/apollo';
import { signInUser } from '@store/userInfo';
import { GET_USER_INFO } from '@queries/user.queries';
import { getUserInfo } from '@gql-types/api';

const initSigninCheck = async () => {
  const apollo = initializeApollo();
  const { data } = await apollo.query<getUserInfo>({
    query: GET_USER_INFO,
    fetchPolicy: 'no-cache',
  });
  if (data.GetUserInfo?.ok) {
    const { familyName, givenName } = data.GetUserInfo.user;
    signInUser(`${familyName}${givenName}`);
  }
};

export default initSigninCheck;
