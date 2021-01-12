import { gql } from '@apollo/client';

export const FIX_POST = gql`
  mutation FixPost($id: Int!, $fix: Boolean!) {
    FixPost(id: $id, fix: $fix) {
      ok
      error
    }
  }
`;
