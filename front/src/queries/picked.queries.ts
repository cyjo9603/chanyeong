import gql from 'graphql-tag';

export const GET_PICKED = gql`
  query getPicked {
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
