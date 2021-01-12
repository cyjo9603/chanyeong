import { gql } from '@apollo/client';

export const GET_PICKED = gql`
  query GetPicked {
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
      }
    }
    GetPickedPosts {
      ok
      error
      posts {
        id
        title
        content
        titleImage
      }
    }
  }
`;
