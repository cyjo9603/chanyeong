import React from 'react';

import PageContainer from '../pageContainer';
import { FooterWrapper, FooterLogoWrapper, FooterInfoWrapper } from './styled';

const Footer = () => (
  <FooterWrapper>
    <PageContainer>
      <FooterLogoWrapper>
        <img src="/footer_logo.svg" alt="logo" />
      </FooterLogoWrapper>
      <FooterInfoWrapper>
        <div>
          <span>조찬영</span>
          <span>cyjo9603@gamil.com</span>
          <span>github.com/cyjo9603</span>
        </div>
        <div>Copyright ⓒ 2020 Cho Chanyeong All Rights Reserved.</div>
      </FooterInfoWrapper>
    </PageContainer>
  </FooterWrapper>
);

export default Footer;
