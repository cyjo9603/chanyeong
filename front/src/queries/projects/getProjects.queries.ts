import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects($input: InputGetProjects!) {
    getProjects(input: $input) {
      ok
      error
      projects {
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
