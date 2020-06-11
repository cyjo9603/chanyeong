import gql from 'graphql-tag';

export const GET_PICKED_PROJECTS = gql`
  query getPickedProjects {
    GetPickedProjects {
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
