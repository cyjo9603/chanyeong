import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
  mutation AddProject($input: InputAddProject!) {
    addProject(input: $input) {
      ok
      error
    }
  }
`;
