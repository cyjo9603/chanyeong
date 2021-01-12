import { gql } from '@apollo/client';

export const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    DeletePost(id: $id) {
      ok
      error
    }
  }
`;
