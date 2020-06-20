import styled from 'styled-components';

export const UpdateSkillFormWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1001;

  & > form {
    margin: 0 auto;
    width: 600px;
    display: flex;
    flex-direction: column;
    background-color: #eeeeee;
    padding: 80px;

    & > span {
      cursor: pointer;
      font-size: 20px;
      align-self: flex-end;
    }

    & > div {
      display: flex;
      flex-direction: column;

      & > input,
      select {
        border: none;
      }
    }

    & > button {
      background-color: ${({ theme }) => theme.FOOTER_BACKGROUND};
      border: none;
      color: ${({ theme }) => theme.LIGHT_GREY};
      height: 50px;
      font-size: 20px;
      font-weight: 700;
    }
  }
`;
