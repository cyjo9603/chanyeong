import React, { useState, useCallback, useEffect, memo } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Container from '../pageContainer';
import NavBar from '../NavBar';
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
            </Link>
          </LogoWrapper>
          <NavWrapper>
            <NavBar />
          </NavWrapper>
        </HeaderSection>
      </Container>
    </HeaderWrapper>
  );
};

export default memo(Header);
