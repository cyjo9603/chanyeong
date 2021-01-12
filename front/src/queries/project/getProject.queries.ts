import { gql } from '@apollo/client';

export const GET_PROJECT = gql`
  query GetProject($id: Int!) {
    GetProject(id: $id) {
      ok
      error
      project {
        id
        type
        groupName
        title
        description
        content
        startDate
        endDate
        githubAddr
        titleImage
        contribution
        picked
        createdAt
        updatedAt
        Skills {
          id
          name
          icon
        }
      }
    }
  }
`;
