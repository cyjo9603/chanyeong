import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($lastId: Int, $tagId: Int, $category: PostCategory) {
    GetPosts(lastId: $lastId, tagId: $tagId, category: $category) {
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
