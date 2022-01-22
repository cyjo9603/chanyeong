import { gql } from '@apollo/client';

export const DELETE_PROJECT = gql`
  mutation DeleteProject($input: InputId!) {
    deleteProject(input: $input) {
      ok
      error
    }
  }
`;
