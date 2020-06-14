import styled from 'styled-components';

export const SignInWrapper = styled.section`
  display: flex;
  margin-top: 100px;
  justify-content: center;

  & > form {
    width: 600px;
    padding: 40px 50px;
    border: 1px solid ${(props) => props.theme.BORDER_LINE_GREY};

    & > div {
      margin-bottom: 10px;
    }

    & > button {
      width: 100%;
      height: 38px;
      border: none;
      font-weight: 600;
      color: ${(props) => props.theme.DARK_BACKGROUND_GREY};
      background-color: ${(props) => props.theme.PRIMARY_COLOR};
      cursor: pointer;
    }
  }
`;
