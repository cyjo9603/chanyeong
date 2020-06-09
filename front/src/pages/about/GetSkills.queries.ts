import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
export const GET_SKILLS = gql`
  query getSkills($type: SkillType) {
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
      }
    }
  }
`;
