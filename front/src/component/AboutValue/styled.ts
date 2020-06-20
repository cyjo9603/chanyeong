import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 310px;

  & > h2 {
    color: ${({ theme }) => theme.LIGHT_BACKGROUND_GREY};
    font-weight: 700;
    font-size: 26px;
    margin: 0;
  }

  & > div {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    text-align: center;
    background-color: ${({ theme }) => theme.PRIMARY_COLOR};

    & > h1 {
      line-height: 200px;
      margin: auto;
      color: ${({ theme }) => theme.DARK_BACKGROUND_GREY};
      font-weight: 800;
      font-size: 40px;
    }
  }

  & > span {
    margin-top: 20px;
    color: ${({ theme }) => theme.PRIMARY_FONT};
    font-weight: 400;
  }

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    width: 260px;

    & > h2 {
      font-size: 22px;
    }

    & > div {
      width: 160px;
      height: 160px;

      & > h1 {
        line-height: 160px;
      }
    }
  }
`;
