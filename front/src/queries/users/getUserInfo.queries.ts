import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query GetUserInfo {
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
