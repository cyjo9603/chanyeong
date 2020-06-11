import gql from 'graphql-tag';

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
