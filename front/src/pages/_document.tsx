import React from 'react';
import Document, { DocumentContext, Head, Main, NextScript } from 'next/document';
import { Helmet, HelmetData } from 'react-helmet';
import { extractCritical } from 'emotion-server';

interface Props {
  helmet: HelmetData;
  styleTags: Array<React.ReactElement<{}>>;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context);
    const styles = extractCritical(initialProps.html);
    return {
      ...initialProps,
      helmet: Helmet.renderStatic(),
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join('')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs} lang="ko">
        <Head>
          {/* Global site tag (gtag.js) - Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-176037246-1" />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-176037246-1');`,
            }}
          />
          {Object.values(helmet).map((el) => el.toComponent())}
        </Head>
        <body {...bodyAttrs}>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
