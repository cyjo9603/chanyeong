import { gql } from '@apollo/client';

export const GET_LOCAL_USER = gql`
  {
    getUserInfo @client {
      userName
    }
  }
`;
