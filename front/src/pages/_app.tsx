/* eslint-disable react/prop-types */
import React from 'react';
import { Helmet } from 'react-helmet';
import withApolloClient from 'next-with-apollo';
import { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import apolloClient from '../apollo';
import { lightTheme, darkTheme } from '../theme';
import AppLayout from '../component/AppLayout';

import '../theme/antd_custom.less';

interface Props extends AppProps {
  apollo: ApolloClient<any>;
}

const App = ({ Component, pageProps, apollo }: Props) => (
  <ThemeProvider theme={true ? lightTheme : darkTheme}>
    <ApolloProvider client={apollo}>
      <Helmet>
        <title>chanyeong</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css"
        ></link>
      </Helmet>
      <AppLayout>
        <Component {...pageProps}>test</Component>
      </AppLayout>
    </ApolloProvider>
  </ThemeProvider>
);

App.getInitialProps = async (context) => {
  const { ctx, Component } = context as AppContext;
  const pageProps = {};
  return { pageProps };
};

export default withApolloClient(apolloClient)(App);
