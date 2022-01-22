import { gql } from '@apollo/client';

export const GET_SKILLS = gql`
  query GetSkills($input: InputGetSkills) {
    getSkills(input: $input) {
      ok
      error
      skills {
        id
        name
        type
        level
        description
        icon
        order
      }
    }
  }
`;
