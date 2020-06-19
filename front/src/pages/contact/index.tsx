import React from 'react';

import PageContainer from '../../component/pageContainer';
import PagePath from '../../component/PagePath';
import { ProfileWrapper } from './styled';

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/contact', name: 'CONTACT' },
];

const Contact = () => (
  <PageContainer>
    <PagePath data={path} />
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
);

export default Contact;
