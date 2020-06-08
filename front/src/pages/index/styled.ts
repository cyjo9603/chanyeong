import styled from 'styled-components';

export const BannerWrapper = styled.section`
  width: 100%;
  height: 440px;
  background: url('/main_banner.jpg') 0 0/ 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
    color: ${(props) => props.theme.PRIMARY_COLOR};
  }
`;

const SummaryWrapper = styled.article`
  padding: 40px 0;
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.BORDER_LINE_GREY};
`;

export const AboutSummaryWrapper = styled(SummaryWrapper)`
  & > div {
    & > section {
      margin: 40px 0;
      display: flex;
      justify-content: space-around;
    }

    & > div:last-child {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export const ArticleHeader = styled.div`
  & > h1 {
    color: ${(props) => props.theme.PRIMARY_COLOR};
    font-size: 28px;
    font-weight: 800;
  }

  & > h2 {
    color: ${(props) => props.theme.PRIMARY_COLOR};
    font-size: 16px;
    font-weight: 700;
  }
`;
