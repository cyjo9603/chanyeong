import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { useQuery } from '@apollo/react-hooks';

import Container from '../pageContainer';
import { HeaderWrapper, StatusBar, HeaderSection, LogoWrapper, NavWrapper } from './styled';
import { getUserInfo } from '../../types/api';
import { GET_USER_INFO } from '../../sharedQueries.queries';

const Header = () => {
  const { data } = useQuery<getUserInfo>(GET_USER_INFO);
  console.log(data);

  return (
    <HeaderWrapper>
      <Container>
        <StatusBar>
          {data ? (
            <>
              <span>로그아웃</span>
              <span>
                {data.GetUserInfo.user.familyName}
                {data.GetUserInfo.user.givenName}님
              </span>
            </>
          ) : (
            <span>
              <Link href="/signin">
                <a>로그인</a>
              </Link>
            </span>
          )}
        </StatusBar>
        <HeaderSection>
          <LogoWrapper>
            <Link href="/">
              <a>
                <img src="/main_logo.svg" alt="logo" />
              </a>
            </Link>{' '}
          </LogoWrapper>
          <NavWrapper>
            <Menu mode="horizontal" selectable={false}>
              <Menu.Item>
                <Link href="/about">
                  <a>ABOUT</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/portfolio">
                  <a>PORTFOILO</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/blog">
                  <a>BLOG</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/contact">
                  <a>CONTACT</a>
                </Link>
              </Menu.Item>
            </Menu>
          </NavWrapper>
        </HeaderSection>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
