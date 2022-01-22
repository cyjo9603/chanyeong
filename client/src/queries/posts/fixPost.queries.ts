import { gql } from '@apollo/client';

export const FIX_POST = gql`
  mutation FixPost($input: InputFix!) {
    fixPost(input: $input) {
      ok
      error
    }
  }
`;
