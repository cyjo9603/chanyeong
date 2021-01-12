import { gql } from '@apollo/client';

export const FIX_PROJECT = gql`
  mutation FixProject($id: Int!, $fix: Boolean!) {
    FixProject(id: $id, fix: $fix) {
      ok
      error
    }
  }
`;
