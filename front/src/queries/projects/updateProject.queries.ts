import { gql } from '@apollo/client';

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: Int!
    $groupName: String!
    $content: String
    $description: String
    $endDate: String
    $githubAddr: String
    $titleImage: String
    $contribution: Int
    $deleteSkills: [Int]
    $addSkills: [Int]
  ) {
    UpdateProject(
      id: $id
      groupName: $groupName
      content: $content
      description: $description
      endDate: $endDate
      githubAddr: $githubAddr
      titleImage: $titleImage
      contribution: $contribution
      deleteSkills: $deleteSkills
      addSkills: $addSkills
    ) {
      ok
      error
    }
  }
`;
