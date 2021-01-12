import { gql } from '@apollo/client';

export const DELETE_SKILL = gql`
  mutation DeleteSkill($id: Int!) {
    DeleteSkill(id: $id) {
      ok
      error
    }
  }
`;
