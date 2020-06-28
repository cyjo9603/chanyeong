import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { getDataFromTree } from '@apollo/react-ssr';

import withApolloClient from '../apollo';
import { lightTheme, darkTheme } from '../theme';
import AppLayout from '../component/AppLayout';
import DarkModeButton from '../component/DarkModeButton';
import { GET_USER_INFO, REISSUANCE_ACCESS_TOKEN } from '../queries/user.queries';
import { getAccessToken, getRefreshToken, setAccessToken } from '../lib/cookie';
import { getUserInfo } from '../types/api';

interface Props extends AppProps {
  apollo: ApolloClient<any>;
}

const App = ({ Component, pageProps, apollo }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onClickDarkMode = useCallback(() => {
    localStorage.setItem('mode', String(!isDarkMode));
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const mode = localStorage.getItem('mode');
    setIsDarkMode(mode === 'true');

    if (accessToken && refreshToken) {
      apollo
        .query({
          query: GET_USER_INFO,
          context: {
            headers: {
              'X-JWT': accessToken,
            },
          },
        })
        .then(async (result: any) => {
          let { GetUserInfo } = (result.data as getUserInfo) || {};

          if (GetUserInfo?.error === 'ERROR_EXPIRATION') {
            apollo.cache.reset();
            const { data } = await apollo.mutate({
              mutation: REISSUANCE_ACCESS_TOKEN,
              variables: { refreshToken },
            });
            if (data?.ReissuanceAccessToken.ok) {
              const { token } = data.ReissuanceAccessToken;
              setAccessToken(token);
              const { data: userInfo } = await apollo.query({
                query: GET_USER_INFO,
                context: { headers: { 'X-JWT': token } },
                fetchResults: true,
              });
              GetUserInfo = userInfo.GetUserInfo;
            }
          }

          if (GetUserInfo?.user) {
            const { familyName, givenName } = GetUserInfo.user;
            apollo.cache.writeData({
              data: {
                isLoggedIn: {
                  __typename: 'IsLoggedIn',
                  userName: `${familyName}${givenName}`,
                },
              },
            });
          }
        });
    }
  }, []);

  return (
    <ThemeProvider theme={!isDarkMode ? lightTheme : darkTheme}>
      <ApolloProvider client={apollo}>
        <Helmet>
          <title>chanyeong</title>
          <meta charSet="UTF-8" />
          <meta name="naver-site-verification" content="2b9008defffc3f461603f5498a43a990cd8b8b65" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="description"
            content="프론트엔드 개발자를 목표로 공부하고 있는 조찬영의 포트폴리오와 블로그 페이지입니다. 개발자가 되기 위해 노력한 제 이야기들을 기록해 놓았습니다."
          />
          <meta name="og:title" content="chanyeong" />
          <meta name="og:image" content="http://image.toast.com/aaaabcy/main_image.png" />
          <meta
            name="og:description"
            content="프론트엔드 개발자를 목표로 공부하고 있는 조찬영의 포트폴리오와 블로그 페이지입니다. 개발자가 되기 위해 노력한 제 이야기들을 기록해 놓았습니다."
          />
          <meta property="og:type" content="website" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.1/antd.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="apple-touch-icon-precomposed" href="/favicon2.png" />
        </Helmet>
        <AppLayout isDarkMode={isDarkMode}>
          <Component {...pageProps} />
          <DarkModeButton onClickDarkMode={onClickDarkMode} isDarkMode={isDarkMode} />
        </AppLayout>
      </ApolloProvider>
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ ctx, Component }: any) => {
  let appProps = {};
  const apolloState = { data: {} };
  const { AppTree, apolloClient } = ctx;
  const pageProps = await Component.getInitialProps?.(ctx);

  if (pageProps) {
    appProps = { pageProps };
  }

  apolloState.data = apolloClient.cache.extract();

  if (typeof window === 'undefined') {
    if (ctx.res?.headersSent || ctx.res?.finished) {
      return pageProps;
    }

    try {
      const props = { ...pageProps, apolloState };
      const appTreeProps = Component ? props : { pageProps: props };
      await getDataFromTree(<AppTree {...appTreeProps} />);
    } catch (error) {
      console.error(error);
    }
  }

  return appProps;
};

export default withApolloClient(App);
