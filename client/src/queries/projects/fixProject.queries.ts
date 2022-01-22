import { gql } from '@apollo/client';

export const FIX_PROJECT = gql`
  mutation FixProject($input: InputFix!) {
    fixProject(input: $input) {
      ok
      error
    }
  }
`;
