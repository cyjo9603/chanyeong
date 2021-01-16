import { gql } from '@apollo/client';

export const DELETE_SKILL = gql`
  mutation DeleteSkill($input: InputId!) {
    deleteSkill(input: $input) {
      ok
      error
    }
  }
`;
