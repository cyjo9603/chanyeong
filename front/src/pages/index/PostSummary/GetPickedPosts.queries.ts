import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
export const GET_PICKED_POSTS = gql`
  query getPickedPosts {
    GetPickedPosts {
      ok
      error
      posts {
        id
        title
        content
        titleImage
        Tags {
          id
          name
        }
      }
    }
  }
`;
