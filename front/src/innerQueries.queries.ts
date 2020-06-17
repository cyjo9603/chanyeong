import gql from 'graphql-tag';

export const LOCAL_SIGN_IN = gql`
  mutation LocalSignIn($userName: String!) {
    LocalSignIn(userName: $userName) @client
  }
`;
