import styled from 'styled-components';

export const InputWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.PRIMARY_COLOR};
  transition: border 1s;

  & > input {
    width: calc(100% - 32px);
    padding: 8px 16px;
    border: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;
