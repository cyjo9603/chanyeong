import { gql } from '@apollo/client';

export const GET_PROJECT = gql`
  query GetProject($input: InputId!) {
    getProject(input: $input) {
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
        skills {
          id
          name
          icon
        }
      }
    }
  }
`;
