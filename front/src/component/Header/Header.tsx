import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { useQuery } from '@apollo/react-hooks';

import Container from '../pageContainer';
import { HeaderWrapper, StatusBar, HeaderSection, LogoWrapper, NavWrapper } from './styled';
import { GET_LOCAL_USER } from './getLocalUser.queries';

const Header = () => {
  const { data } = useQuery(GET_LOCAL_USER);

  return (
    <HeaderWrapper>
      <Container>
        <StatusBar>
          {data?.isLoggedIn.userName ? (
            <>
              <span>로그아웃</span>
              <span>{data.isLoggedIn.userName}님</span>
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
