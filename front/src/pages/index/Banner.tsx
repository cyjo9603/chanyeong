import React from 'react';
import TextLoop from 'react-text-loop';

import PageContainer from '../../component/pageContainer';
import { BannerWrapper, IntroWrapper } from './styled';

const Banner = () => (
  <BannerWrapper>
    <PageContainer>
      <IntroWrapper>
        <span>저는 </span>
        <TextLoop interval={4000}>
          <span>프론트엔드 개발자를 꿈꾸는</span>
          <span>소통을 중요하게 생각하는</span>
          <span>끊임없이 노력하는</span>
        </TextLoop>
        <br />
        <TextLoop interval={4000}>
          <span>조찬영</span>
          <span>개발자</span>
          <span>열정을 가진 사람</span>
        </TextLoop>
        <span> 입니다.</span>
      </IntroWrapper>
    </PageContainer>
  </BannerWrapper>
);

export default Banner;
