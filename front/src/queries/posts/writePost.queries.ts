import { gql } from '@apollo/client';

export const WRITE_POST = gql`
  mutation WritePost($input: InputWritePost!) {
    writePost(input: $input) {
      ok
      error
    }
  }
`;
