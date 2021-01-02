import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'emotion-theming';
import { ApolloProvider } from '@apollo/client';

import { lightTheme, darkTheme } from '@theme/.';
import GlobalStyle from '@theme/globalStyle';
import AppLayout from '@frames/AppLayout';
import DarkModeButton from '@molecules/DarkModeButton';
import initSigininCheck from '@lib/initSigninCheck';
import { useApollo } from '@src/apollo';

const App = ({ Component, pageProps }: AppProps) => {
  const apollo = useApollo();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onClickDarkMode = useCallback(() => {
    localStorage.setItem('mode', String(!isDarkMode));
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const mode = localStorage.getItem('mode');
    setIsDarkMode(mode === 'true');
    initSigininCheck(apollo);
  }, []);

  return (
    <ThemeProvider theme={!isDarkMode ? lightTheme : darkTheme}>
      <ApolloProvider client={apollo}>
        <Helmet>
          <title>chanyeong</title>
          <meta charSet="UTF-8" />
          <meta
            name="naver-site-verification"
            content="2b9008defffc3f461603f5498a43a990cd8b8b65"
          />
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
          <meta
            name="og:image"
            content="http://image.toast.com/aaaabcy/main_image.png"
          />
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
        <GlobalStyle theme={!isDarkMode ? lightTheme : darkTheme} />
        <AppLayout>
          <Component {...pageProps} />
          <DarkModeButton onClick={onClickDarkMode} isDarkMode={isDarkMode} />
        </AppLayout>
      </ApolloProvider>
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ ctx, Component }) => {
  const pageProps = await Component.getInitialProps?.(ctx);
  const appProps = pageProps ? { pageProps } : {};

  return appProps;
};

export default App;
