import { gql } from '@apollo/client';

export const SIGNIN_REQUEST = gql`
  mutation SignIn($userId: String!, $password: String!) {
    SignIn(userId: $userId, password: $password) {
      ok
      error
      userName
    }
  }
`;
