import { gql } from '@apollo/client';

export const SEARCH_POSTS = gql`
  query SearchPosts($input: InputSearchPosts!) {
    searchPosts(input: $input) {
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
