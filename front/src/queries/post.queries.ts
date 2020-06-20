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

export const GET_POST = gql`
  query getPost($id: Int!) {
    GetPost(id: $id) {
      ok
      error
      post {
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

export const GET_POSTS = gql`
  query getPosts($lastId: Int, $tagId: Int, $category: PostCategory) {
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

export const WRITE_POST = gql`
  mutation writePost(
    $category: PostCategory!
    $title: String!
    $content: String!
    $titleImage: String
    $tags: [String]
  ) {
    WritePost(category: $category, title: $title, content: $content, titleImage: $titleImage, tags: $tags) {
      ok
      error
    }
  }
`;
