import { gql } from '@apollo/client';

export const SEARCH_POSTS = gql`
  query SearchPosts($searchWord: String!, $lastId: Int) {
    SearchPosts(searchWord: $searchWord, lastId: $lastId) {
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
        Tags {
          id
          name
        }
      }
    }
  }
`;
