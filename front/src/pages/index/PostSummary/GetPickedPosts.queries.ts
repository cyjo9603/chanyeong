import gql from 'graphql-tag';

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
