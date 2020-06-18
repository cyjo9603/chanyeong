import React, { useCallback } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Container from '../pageContainer';
import { HeaderWrapper, StatusBar, HeaderSection, LogoWrapper, NavWrapper, LogoutWrapper } from './styled';
import { LOG_OUT } from './Header.queries';
import { GET_LOCAL_USER } from '../../sharedQueries.queries';
import { clearCookie, getAccessToken } from '../../lib/cookie';

const Header = () => {
  const { data } = useQuery(GET_LOCAL_USER);
  const [logoutMutation] = useMutation(LOG_OUT);

  const onClickLogout = useCallback(() => {
    logoutMutation({
      context: {
        headers: {
          'X-JWT': getAccessToken(),
        },
      },
    });
    clearCookie();
  }, [getAccessToken()]);

  return (
    <HeaderWrapper>
      <Container>
        <StatusBar>
          {data?.isLoggedIn.userName ? (
            <>
              <span>{data.isLoggedIn.userName}님</span>
              <LogoutWrapper onClick={onClickLogout}>로그아웃</LogoutWrapper>
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
