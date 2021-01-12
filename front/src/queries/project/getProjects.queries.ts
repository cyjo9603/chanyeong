import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects($type: ProjectType) {
    GetProjects(type: $type) {
      ok
      error
      project {
        id
        type
        groupName
        title
        description
        startDate
        endDate
        titleImage
        contribution
      }
    }
  }
`;
