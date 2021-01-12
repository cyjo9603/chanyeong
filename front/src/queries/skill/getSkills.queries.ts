import { gql } from '@apollo/client';

export const GET_SKILLS = gql`
  query GetSkills($type: SkillType) {
    GetSkills(type: $type) {
      ok
      error
      skill {
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
