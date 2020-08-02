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
        order
      }
    }
  }
`;

export const ADD_SKILL = gql`
  mutation AddSkill(
    $name: String!
    $type: SkillType!
    $level: Int!
    $description: String!
    $icon: String!
    $order: Int!
  ) {
    AddSkill(name: $name, type: $type, level: $level, description: $description, icon: $icon, order: $order) {
      ok
      error
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation UpdateSkill(
    $id: Int!
    $name: String
    $type: SkillType
    $level: Int
    $description: String
    $icon: String
    $order: Int
  ) {
    UpdateSkill(
      id: $id
      name: $name
      type: $type
      level: $level
      description: $description
      icon: $icon
      order: $order
    ) {
      ok
      error
    }
  }
`;
