import { gql } from '@apollo/client';

export const GET_POST = gql`
  query GetPost($id: Int!) {
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
