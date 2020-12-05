import gql from 'graphql-tag';

export const SIGNIN_REQUEST = gql`
  mutation signIn($userId: String!, $password: String!) {
    SignIn(userId: $userId, password: $password) {
      ok
      error
      userName
    }
  }
`;

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

export const REISSUANCE_ACCESS_TOKEN = gql`
  mutation reissuanceAccessToken {
    ReissuanceAccessToken {
      ok
      error
    }
  }
`;
