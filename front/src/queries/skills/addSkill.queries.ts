import { gql } from '@apollo/client';

export const ADD_SKILL = gql`
  mutation AddSkill($input: InputAddSkill!) {
    addSkill(input: $input) {
      ok
      error
    }
  }
`;
