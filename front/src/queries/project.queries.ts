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
          icon
        }
      }
    }
  }
`;

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

export const UPDATE_PROJECT = gql`
  mutation updateProject(
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
