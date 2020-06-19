import gql from 'graphql-tag';

export const GET_PROJECT = gql`
  query getProject($id: Int!) {
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
          type
          level
          description
          icon
        }
      }
    }
  }
`;
