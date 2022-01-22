import { gql } from '@apollo/client';

export const SIGNIN_REQUEST = gql`
  mutation SignIn($input: InputSignin!) {
    signin(input: $input) {
      ok
      error
      userName
    }
  }
`;
