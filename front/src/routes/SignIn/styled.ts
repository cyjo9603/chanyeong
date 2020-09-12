import styled from 'styled-components';

export const SignInWrapper = styled.section`
  display: flex;
  margin-top: 100px;
  justify-content: center;

  & > form {
    width: 500px;
    padding: 100px 80px;
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
      background-color: ${(props) => props.theme.FOOTER_BACKGROUND};
      cursor: pointer;
      transition: opacity 0.5s;

      &:hover {
        opacity: 0.9;
      }

      &:disabled {
        background-color: ${({ theme }) => theme.DISABLED};
        opacity: 1;
        cursor: not-allowed;
      }
    }
  }
`;
