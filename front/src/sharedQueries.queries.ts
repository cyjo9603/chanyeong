import gql from 'graphql-tag';

export const GET_USER_INFO = gql`
  query getUserInfo {
    GetUserInfo {
      ok
      error
      user {
        id
        familyName
        givenName
      }
    }
  }
`;
