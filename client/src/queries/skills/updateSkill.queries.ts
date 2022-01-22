import { gql } from '@apollo/client';

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($input: InputUpdateSkill!) {
    updateSkill(input: $input) {
      ok
      error
    }
  }
`;
