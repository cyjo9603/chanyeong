import { gql } from '@apollo/client';

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: Int!) {
    DeleteProject(id: $id) {
      ok
      error
    }
  }
`;
