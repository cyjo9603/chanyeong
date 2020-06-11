import gql from 'graphql-tag';

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
