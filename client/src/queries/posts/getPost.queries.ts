import { gql } from '@apollo/client';

export const GET_POST = gql`
  query GetPost($input: InputId!) {
    getPost(input: $input) {
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
        tags {
          id
          name
        }
      }
    }
  }
`;
