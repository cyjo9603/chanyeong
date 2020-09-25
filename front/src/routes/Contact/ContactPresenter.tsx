import React from 'react';
import { Helmet } from 'react-helmet';

import PageContainer from '@component/pageContainer';
import PagePath from '@component/PagePath';
import { ProfileWrapper } from './styled';

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/contact', name: 'CONTACT' },
];

const Contact = () => (
  <>
    <Helmet>
      <title>연락처 :: chanyeong</title>
      <meta name="description" content="개발자 조찬영의 연락처입니다." />
      <meta name="og:title" content="연락처 :: chanyeong" />
      <meta name="og:description" content="개발자 조찬영의 연락처입니다." />
    </Helmet>
    <PageContainer>
      <PagePath data={path} page="contact" />
      <ProfileWrapper>
        <img src="/profile.jpg" alt="profile" />
        <span>조찬영</span>
        <div>
          <div>
            <span>Mail : cyjo9603@gmail.com</span>
          </div>
          <div>
            <span>Kakaotalk : chnyng9603</span>
          </div>
          <div>
            <a href="https://github.com/cyjo9603" target="_blank" rel="noopener noreferrer">
              <span>GitHub : github.com/cyjo9603</span>
            </a>
          </div>
        </div>
      </ProfileWrapper>
    </PageContainer>
  </>
);

export default Contact;
