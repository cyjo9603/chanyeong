import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
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
