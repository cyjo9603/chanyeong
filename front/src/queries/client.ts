import gql from 'graphql-tag';

export const LOCAL_SIGN_IN = gql`
  mutation LocalSignIn($userName: String!) {
    LocalSignIn(userName: $userName) @client
  }
`;

export const GET_LOCAL_USER = gql`
  {
    isLoggedIn @client {
      userName
    }
  }
`;

export const LOG_OUT = gql`
  mutation LogOut {
    LogOut {
      ok
      error
    }

    LocalLogOut @client
  }
`;
