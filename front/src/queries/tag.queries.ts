import gql from 'graphql-tag';

export const GET_TAGS = gql`
  query getTags {
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
