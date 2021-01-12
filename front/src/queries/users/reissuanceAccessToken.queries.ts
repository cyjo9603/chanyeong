import { gql } from '@apollo/client';

export const REISSUANCE_ACCESS_TOKEN = gql`
  mutation ReissuanceAccessToken {
    ReissuanceAccessToken {
      ok
      error
    }
  }
`;
