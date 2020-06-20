import React from 'react';
import Document, { DocumentContext, Head, Main, NextScript } from 'next/document';
import { Helmet, HelmetData } from 'react-helmet';
import { ServerStyleSheet, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body, #__next{
    height: 100%;
  }

  & * {
    font-family: 'Noto Sans KR', sans-serif !important;
  }
`;

interface Props {
  helmet: HelmetData;
  styleTags: Array<React.ReactElement<{}>>;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context);
    const sheet = new ServerStyleSheet();
    const page = context.renderPage((App) => (props) =>
      sheet.collectStyles(
        <>
          <GlobalStyle />
          <App {...props} />
        </>,
      ),
    );
    const styleTags = sheet.getStyleElement();
    return { ...initialProps, ...page, helmet: Helmet.renderStatic(), styleTags };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs} lang="ko">
        <Head>
          {this.props.styleTags}
          {Object.values(helmet).map((el) => el.toComponent())}
        </Head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
