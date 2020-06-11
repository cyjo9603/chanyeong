import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
  query getPosts($lastId: Int, $category: PostCategory) {
    GetPosts(lastId: $lastId, category: $category) {
      ok
      error
      posts {
        id
        category
        title
        content
        titleImage
        createdAt
        Tags {
          id
          name
        }
      }
    }
  }
`;

export const GET_TAG_POSTS = gql`
  query getTagPosts($lastId: Int, $tagId: Int!) {
    GetTagPosts(lastId: $lastId, tagId: $tagId) {
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
