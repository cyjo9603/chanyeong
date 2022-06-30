import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import styled from 'styled-components';
import RowFrame from '@frames/RowFrame';
import BreadCrumbs from '@molecules/BreadCrumbs';

const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.PRIMARY_FONT};

  & > span {
    font-weight: 700;
    font-size: 18px;
  }

  & img {
    border-radius: 100px;
  }

  & .contact-name {
    margin-top: 10px;
  }

  & > div span {
    color: ${({ theme }) => theme.PRIMARY_FONT};
    font-size: 13px;
  }
`;

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/contact', name: 'CONTACT' },
];

const Contact = () => (
  <>
    <Head>
      <title>연락처 :: chanyeong</title>
      <meta name="description" content="개발자 조찬영의 연락처입니다." />
      <meta name="og:title" content="연락처 :: chanyeong" />
      <meta name="og:description" content="개발자 조찬영의 연락처입니다." />
    </Head>
    <RowFrame>
      <BreadCrumbs data={path} page="contact" />
      <StyledContact>
        <Image src="/profile.jpg" alt="profile" width={200} height={200} />
        <span className="contact-name">조찬영</span>
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
      </StyledContact>
    </RowFrame>
  </>
);

export default Contact;
