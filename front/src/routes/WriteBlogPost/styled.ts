import styled from '@theme/styled';

export const BlogWriteHeader = styled.div`
  margin: 10px 0;
  display: flex;
  color: ${({ theme }) => theme.PRIMARY_FONT};

  & input {
    border: 1px solid ${(props) => props.theme.BORDER_LINE_DARK_GREY};
    width: 400px;

    &:focus {
      outline: none;
    }
  }

  & > div:first-child {
    margin-right: 20px;
  }
`;

export const BlogWriteBottom = styled.div`
  color: ${({ theme }) => theme.PRIMARY_FONT};
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
