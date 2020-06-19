import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 14px 0;
`;

export const PageFooter = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  & > div:last-child > span {
    margin-left: 8px;
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

export const InputWrapper = styled.div`
  width: 48%;
  & input,
  select {
    border: 1px solid ${(props) => props.theme.BORDER_LINE_DARK_GREY};
    width: 100%;

    &:focus {
      outline: none;
    }
  }
`;