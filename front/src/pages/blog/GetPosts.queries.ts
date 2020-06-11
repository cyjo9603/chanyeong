import gql from 'graphql-tag';

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
