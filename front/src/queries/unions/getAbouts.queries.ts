import { gql } from '@apollo/client';

export const GET_ABOUTS = gql`
  query GetAbouts {
    GetExperiences {
      ok
      error
      experiences {
        id
        startDate
        endDate
        title
        content
      }
    }
    GetGroupedSkills {
      ok
      error
      skills {
        front {
          id
          name
          type
          level
          description
          icon
          order
        }
        back {
          id
          name
          type
          level
          description
          icon
          order
        }
        devops {
          id
          name
          type
          level
          description
          icon
          order
        }
      }
    }
  }
`;
