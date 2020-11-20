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

  & > div:first-child {
    display: flex;
    align-items: center;

    & > div {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      & > span {
        margin-right: 8px;
        margin-bottom: 8px;
        background-color: ${(props) => props.theme.TAG_BACKGROUND};
        padding: 2px 8px;
        border-radius: 8px;

        & > span:first-child {
          margin-right: 0;
        }

        & > span:last-child {
          cursor: pointer;
        }
      }
    }
  }
  & input {
    border: 1px solid ${(props) => props.theme.BORDER_LINE_DARK_GREY};
    width: 200px;
    margin-right: 20px;

    &:focus {
      outline: none;
    }
  }

  & button {
    margin-right: 10px;
    background-color: ${(props) => props.theme.PRIMARY_COLOR};
    color: ${(props) => props.theme.DARK_BACKGROUND_GREY};
    border: none;
    border-radius: 2px;
    cursor: pointer;
    font-weight: 600;

    &:focus {
      outline: none;
    }
  }
`;
