import styled from 'styled-components';

export const BannerWrapper = styled.section`
  position: relative;
  top: -111px;
  width: 100%;
  height: 100vh;
  background-image: url(${({ theme }) => theme.BACKGROUND_URL});
  background-size: cover;
  background-attachment: fixed;
  background-position-x: center;
  transition: background 0.5s;

  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const IntroWrapper = styled.div`
  margin-top: 40px;
  width: 100%;

  & div,
  span {
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: 800;
    color: ${({ theme }) => theme.PRIMARY_FONT};
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    margin-bottom: 0;

    & div,
    span {
      font-size: 20px;
    }
  }
`;

export const SummaryWrapper = styled.article`
  padding: 40px 0;
  width: 100%;

  & > div:last-child {
    display: flex;
    justify-content: flex-end;

    & span {
      color: ${({ theme }) => theme.PRIMARY_FONT};
    }
    & svg {
      padding-top: 2px;
    }
  }
`;

export const AboutSummaryWrapper = styled(SummaryWrapper)`
  border-bottom: 2px solid ${({ theme }) => theme.BORDER_LINE_GREY};

  & > section {
    width: 100%;
    margin: 40px 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
      & > div {
        margin-bottom: 40px;

        & :last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export const ProjectSummaryWrapper = styled(SummaryWrapper)`
  border-bottom: 2px solid ${({ theme }) => theme.BORDER_LINE_GREY};

  & > section {
    margin: 40px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    grid-row-gap: 40px;

    @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
      grid-template-columns: 1fr;
      justify-items: left;
    }
  }
`;
export const SliderWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 30px 0;
`;

export const ArticleHeader = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.PRIMARY_FONT};
  & > h1 {
    font-size: 28px;
    font-weight: 800;
  }

  & > h2 {
    font-size: 16px;
    font-weight: 700;
  }
`;
