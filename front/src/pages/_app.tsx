import React, { useCallback, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from 'emotion-theming';
import { ApolloProvider } from '@apollo/client';
import { useCookies } from 'react-cookie';

import { lightTheme, darkTheme } from '@theme/.';
import GlobalStyle from '@theme/globalStyle';
import AppLayout from '@frames/AppLayout';
import DarkModeButton from '@molecules/DarkModeButton';
import initSigininCheck from '@lib/initSigninCheck';
import { useApollo } from '@src/apollo';
import cookieParser from '@lib/cookieParser';

const LIGHT_MODE = 'light';
const DARK_MODE = 'dark';

interface Props extends AppProps {
  mode: typeof LIGHT_MODE | typeof DARK_MODE;
}

const App = ({ Component, pageProps, mode: modeInCookie }: Props) => {
  const apollo = useApollo();
  const [cookies, setCookie] = useCookies(['mode']);
  const mode = useMemo(() => cookies.mode || modeInCookie, [modeInCookie, cookies.mode]);

  const onClickDarkMode = useCallback(() => {
    setCookie('mode', mode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE);
  }, [mode]);

  useEffect(() => {
    if (!cookies.mode) setCookie('mode', LIGHT_MODE);
    initSigininCheck();
  }, []);

  return (
    <ThemeProvider theme={mode === LIGHT_MODE ? lightTheme : darkTheme}>
      <ApolloProvider client={apollo}>
        <Head>
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
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
          />
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="apple-touch-icon-precomposed" href="/favicon2.png" />
        </Head>
        <GlobalStyle theme={mode === LIGHT_MODE ? lightTheme : darkTheme} />
        <AppLayout>
          <Component {...pageProps} />
          <DarkModeButton onClick={onClickDarkMode} isDarkMode={mode === DARK_MODE} />
        </AppLayout>
      </ApolloProvider>
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ ctx }: AppContext) => {
  const cookies = cookieParser(ctx.req?.headers?.cookie);
  return { mode: cookies.mode || LIGHT_MODE };
};

export default App;
