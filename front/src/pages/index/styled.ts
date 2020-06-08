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
