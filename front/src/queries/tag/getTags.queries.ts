import { gql } from '@apollo/client';

export const GET_TAGS = gql`
  query GetTags {
    GetTags {
      ok
      error
      tags {
        id
        name
        count
      }
    }
  }
`;
