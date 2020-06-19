import styled from 'styled-components';

export const BannerWrapper = styled.section`
  width: 100%;
  height: 440px;
  background: url('/main_banner.jpg') 0 0/ 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    height: 300px;
  }
`;

export const IntroWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  width: 40%;
  height: 100px;
  margin-bottom: 60px;

  & div,
  span {
    font-size: 30px;
    font-weight: 800;
    color: ${({ theme }) => theme.PRIMARY_COLOR};
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
  border-bottom: 2px solid ${({ theme }) => theme.BORDER_LINE_GREY};

  & > div:last-child {
    display: flex;
    justify-content: flex-end;
  }
`;

export const AboutSummaryWrapper = styled(SummaryWrapper)`
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
  & > h1 {
    color: ${({ theme }) => theme.PRIMARY_COLOR};
    font-size: 28px;
    font-weight: 800;
  }

  & > h2 {
    color: ${({ theme }) => theme.PRIMARY_COLOR};
    font-size: 16px;
    font-weight: 700;
  }
`;
