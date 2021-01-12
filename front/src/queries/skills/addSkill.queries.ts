import { gql } from '@apollo/client';

export const ADD_SKILL = gql`
  mutation AddSkill(
    $name: String!
    $type: SkillType!
    $level: Int!
    $description: String!
    $icon: String!
    $order: Int!
  ) {
    AddSkill(
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
