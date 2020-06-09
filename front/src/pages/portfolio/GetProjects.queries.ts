import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
export const GET_PROJECTS = gql`
  query getProjects($type: ProjectType) {
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
