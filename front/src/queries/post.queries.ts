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
        picked
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

export const EDIT_POST = gql`
  mutation editPost(
    $id: Int!
    $category: PostCategory
    $title: String
    $content: String
    $titleImage: String
    $deleteTags: [Int]
    $addTags: [String]
  ) {
    EditPost(
      id: $id
      category: $category
      title: $title
      content: $content
      titleImage: $titleImage
      deleteTags: $deleteTags
      addTags: $addTags
    ) {
      ok
      error
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: Int!) {
    DeletePost(id: $id) {
      ok
      error
    }
  }
`;

export const FIX_POST = gql`
  mutation fixPost($id: Int!, $fix: Boolean!) {
    FixPost(id: $id, fix: $fix) {
      ok
      error
    }
  }
`;
