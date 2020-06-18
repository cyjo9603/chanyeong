import gql from 'graphql-tag';

export const LOG_OUT = gql`
  mutation LogOut {
    LogOut {
      ok
      error
    }

    LocalLogOut @client
  }
`;
