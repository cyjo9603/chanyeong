import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($input: InputGetPosts!) {
    getPosts(input: $input) {
      ok
      error
      posts {
        id
        category
        title
        content
        titleImage
        createdAt
        updatedAt
        tags {
          id
          name
        }
      }
    }
  }
`;
