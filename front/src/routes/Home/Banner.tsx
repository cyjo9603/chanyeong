import React from 'react';
import TextLoop from 'react-text-loop';

import RowFrame from '@frames/RowFrame';
import styled from '@theme/styled';

const StyledBanner = styled.section`
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

  & .banner-intro {
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
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    background-attachment: scroll;

    & .banner-intro {
      width: 100%;
      margin-bottom: 0;

      & div,
      span {
        font-size: 20px;
      }
    }
  }
`;

const Banner = () => (
  <StyledBanner>
    <RowFrame>
      <div className="banner-intro">
        <TextLoop interval={3000}>
          <span>
            프론트엔드 개발자를 꿈꾸는
            <br />
            조찬영입니다
          </span>
          <span>
            소통을 중요하게
            <br />
            생각합니다
          </span>
          <span>
            끊임없이 노력하는 열정과
            <br />
            개발에 대한 애정을 가지고 있습니다
          </span>
          <span>
            새로운 기술에 대해
            <br />
            배우는 것을 좋아합니다
          </span>
        </TextLoop>
      </div>
    </RowFrame>
  </StyledBanner>
);

export default Banner;
