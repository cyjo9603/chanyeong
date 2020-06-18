import gql from 'graphql-tag';

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
