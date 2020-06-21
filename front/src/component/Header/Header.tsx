import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Container from '../pageContainer';
import { HeaderWrapper, StatusBar, HeaderSection, LogoWrapper, NavWrapper, LogoutWrapper } from './styled';
import { LOG_OUT, GET_LOCAL_USER } from '../../queries/client';
import { clearCookie, getAccessToken } from '../../lib/cookie';

interface Props {
  isDarkMode: boolean;
}

const Header = ({ isDarkMode }: Props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { data } = useQuery(GET_LOCAL_USER);
  const [logoutMutation] = useMutation(LOG_OUT);

  useEffect(() => {
    const loginKey = localStorage.getItem('LOGIN_KEY');
    if (process.env.LOGIN_KEY === loginKey) {
      setIsAdmin(true);
    }
  }, []);

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
        {
          <StatusBar>
            {data?.isLoggedIn.userName ? (
              <>
                <span>{data.isLoggedIn.userName}님</span>
                <LogoutWrapper onClick={onClickLogout}>로그아웃</LogoutWrapper>
              </>
            ) : (
              isAdmin && (
                <span>
                  <Link href="/signin">
                    <a>로그인</a>
                  </Link>
                </span>
              )
            )}
          </StatusBar>
        }
        <HeaderSection>
          <LogoWrapper>
            <Link href="/">
              <a>
                <img src={isDarkMode ? '/dark_logo.svg' : '/main_logo.svg'} alt="logo" />
              </a>
            </Link>{' '}
          </LogoWrapper>
          <NavWrapper>
            <Menu mode="horizontal" selectable={false} overflowedIndicator={<MenuOutlined />}>
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
