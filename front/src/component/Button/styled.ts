import styled from 'styled-components';

export const ButtonWrapper = styled.button<{ align: string }>`
  float: ${({ align }) => align};
  margin-right: 10px;
  background-color: ${({ theme }) => theme.PRIMARY_COLOR};
  color: ${({ theme }) => theme.DARK_BACKGROUND_GREY};
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-weight: 600;
  padding: 0 20px;

  &:focus {
    outline: none;
  }
`;
