import { gql } from '@apollo/client';

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
