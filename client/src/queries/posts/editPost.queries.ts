import { gql } from '@apollo/client';

export const EDIT_POST = gql`
  mutation EditPost($input: InputEditPost!) {
    editPost(input: $input) {
      ok
      error
    }
  }
`;
