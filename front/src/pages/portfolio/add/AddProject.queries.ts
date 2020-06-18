import gql from 'graphql-tag';

export const ADD_PROJECT = gql`
  mutation addProject(
    $type: ProjectType!
    $groupName: String!
    $title: String!
    $content: String!
    $description: String!
    $startDate: String!
    $endDate: String
    $githubAddr: String
    $titleImage: String
    $contribution: Int!
    $skillIds: [Int]
  ) {
    AddProject(
      type: $type
      groupName: $groupName
      title: $title
      content: $content
      description: $description
      startDate: $startDate
      endDate: $endDate
      githubAddr: $githubAddr
      titleImage: $titleImage
      contribution: $contribution
      skillIds: $skillIds
    ) {
      ok
      error
    }
  }
`;
