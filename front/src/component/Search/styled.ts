import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const SearchForm = styled.form`
  display: flex;
  border: 1px solid ${(props) => props.theme.BORDER_LINE_DARK_GREY};
  border-radius: 8px;

  & > input {
    border: none;
    margin-left: 8px;

    &:focus {
      outline: none;
    }
  }

  & > span {
    width: 32px;
    height: 30px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    & > svg {
    }
  }
`;
