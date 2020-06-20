/* eslint-disable react/prop-types */
import React, { useState, useCallback, useMemo, useEffect } from 'react';
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
import { REGEXP_ACCESS_TOKEN } from '../secret';
import { GET_USER_INFO } from '../queries/user.queries';

interface Props extends AppProps {
  apollo: ApolloClient<any>;
  apolloData: any;
}

const App = ({ Component, pageProps, apollo, apolloData }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const apolloClient = useMemo(() => {
    apollo.restore(apolloData);
    return apollo;
  }, [apollo, apolloData]);

  const onClickDarkMode = useCallback(() => {
    localStorage.setItem('mode', String(!isDarkMode));
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const mode = localStorage.getItem('mode');
    setIsDarkMode(mode === 'true');
  }, []);

  return (
    <ThemeProvider theme={!isDarkMode ? lightTheme : darkTheme}>
      <ApolloProvider client={apolloClient}>
        <Helmet>
          <title>chanyeong</title>
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

  const cookies = ctx.req?.headers?.cookie;

  if (pageProps) {
    appProps = { pageProps };
  }

  if (cookies) {
    const accessToken = cookies.replace(REGEXP_ACCESS_TOKEN, '$1');
    const { data } = await apolloClient.query({
      query: GET_USER_INFO,
      context: {
        headers: {
          'X-JWT': accessToken,
        },
      },
    });
    if (data?.GetUserInfo.user) {
      const { familyName, givenName } = data.GetUserInfo.user;
      apolloClient.cache.writeData({
        data: {
          isLoggedIn: {
            __typename: 'IsLoggedIn',
            userName: `${familyName}${givenName}`,
          },
        },
      });
    }
  }

  apolloState.data = apolloClient.cache.extract();
  appProps = { ...appProps, apolloData: apolloState.data };

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

  // console.log('appProps', appProps);

  return appProps;
};

export default withApolloClient(App);
