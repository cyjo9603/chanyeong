import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const GET_TAGS = gql`
  query getTags {
    GetTags {
      ok
      error
      tags {
        id
        name
      }
    }
  }
`;
