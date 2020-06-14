import styled from 'styled-components';

export const InputWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.PRIMARY_COLOR};
  transition: border 1s;

  & > input {
    width: 100%;
    padding: 8px 16px;
    border: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;
