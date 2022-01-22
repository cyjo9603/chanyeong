import { gql } from '@apollo/client';

export const GET_PICKED = gql`
  query GetPicked {
    getPickedProjects {
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
      }
    }
    getPickedPosts {
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
