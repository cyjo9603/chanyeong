import gql from 'graphql-tag';

export const GET_LOCAL_USER = gql`
  {
    isLoggedIn @client {
      userName
    }
  }
`;
