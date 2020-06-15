/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
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

import '../theme/antd_custom.less';

interface Props extends AppProps {
  apollo: ApolloClient<any>;
}

const App = ({ Component, pageProps, apollo }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onClickDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={!isDarkMode ? lightTheme : darkTheme}>
      <ApolloProvider client={apollo}>
        <Helmet>
          <title>chanyeong</title>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css"
          ></link>
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
        <AppLayout>
          <Component {...pageProps} />
          <DarkModeButton onClickDarkMode={onClickDarkMode} isDarkMode={isDarkMode} />
        </AppLayout>
      </ApolloProvider>
    </ThemeProvider>
  );
};

App.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  const pageProps = Component.getInitialProps?.(ctx);
  const apolloState = { data: {} };
  const { AppTree, apolloClient } = ctx;

  if (ctx.isServer) {
    if (ctx.res?.headersSent || ctx.res?.finished) {
      return pageProps;
    }

    try {
      const props = { ...pageProps, apolloState };
      const appTreeProps = 'Component' in ctx ? props : { pageProps: props };
      await getDataFromTree(<AppTree {...appTreeProps} />);
    } catch (error) {
      console.error(error);
    }
  }

  apolloState.data = apolloClient.cache.extract();
  return { pageProps };
};

export default withApolloClient(App);
