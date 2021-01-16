import { gql } from '@apollo/client';

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: InputUpdateProject!) {
    updateProject(input: $input) {
      ok
      error
    }
  }
`;
