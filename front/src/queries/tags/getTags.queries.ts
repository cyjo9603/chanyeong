import { gql } from '@apollo/client';

export const GET_TAGS = gql`
  query GetTags {
    getTags {
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
