import React, { useState, useCallback, useEffect, memo } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Container from '@component/pageContainer';
import NavBar from '@component/NavBar';
import { LOG_OUT, GET_LOCAL_USER } from '@queries/client';
import { clearCookie, getAccessToken } from '@lib/cookie';
import { StatusBar, HeaderSection, LogoWrapper, NavWrapper, LogoutWrapper } from './styled';

interface Props {
  isDarkMode: boolean;
}

const HIDDEN_STATUSBAR = 0.3 as const;

const Header = ({ isDarkMode }: Props) => {
  const [scrollRatio, setScrollRatio] = useState(0);
  const { data } = useQuery(GET_LOCAL_USER);
  const [logoutMutation] = useMutation(LOG_OUT);

  const onScroll = useCallback(() => {
    const { scrollTop } = document.body;

    if (scrollTop <= 100 && scrollTop >= 0) {
      const currentScrollRatio = scrollTop / 100;
      setScrollRatio(currentScrollRatio);
    } else if (scrollTop > 100 && scrollRatio !== 1) {
      setScrollRatio(1);
    }
  }, [scrollRatio]);

  useEffect(() => {
    document.body.addEventListener('scroll', onScroll);

    return () => document.body.removeEventListener('scroll', onScroll);
  }, [onScroll]);

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
    <>
      <StatusBar isHidden={scrollRatio > HIDDEN_STATUSBAR}>
        <Container>
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
        </Container>
      </StatusBar>

      <HeaderSection scrollRatio={scrollRatio}>
        <Container>
          <LogoWrapper scrollRatio={scrollRatio}>
            <Link href="/">
              <a>
                <img src={isDarkMode ? '/dark_logo.svg' : '/main_logo.svg'} alt="logo" />
              </a>
            </Link>
          </LogoWrapper>
          <NavWrapper>
            <NavBar />
          </NavWrapper>
        </Container>
      </HeaderSection>
    </>
  );
};

export default memo(Header);
