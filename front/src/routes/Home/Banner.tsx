import React from 'react';
import TextLoop from 'react-text-loop';

import PageContainer from '@component/pageContainer';
import { BannerWrapper, IntroWrapper } from './styled';

const Banner = () => (
  <BannerWrapper>
    <PageContainer>
      <IntroWrapper>
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
      </IntroWrapper>
    </PageContainer>
  </BannerWrapper>
);

export default Banner;
