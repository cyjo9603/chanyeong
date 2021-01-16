import { gql } from '@apollo/client';

export const DELETE_POST = gql`
  mutation DeletePost($input: InputId!) {
    deletePost(input: $input) {
      ok
      error
    }
  }
`;
