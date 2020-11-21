import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import { reset } from 'emotion-reset';

import { lightTheme } from '@theme';

const GlobalStyle = () => (
  <Global
    styles={css`
      ${reset}

      body.sb-show-main {
        margin: 0 !important;
        padding: 0 !important;
      }

      html,
      body {
        overflow-x: hidden;
        width: 100%;
        height: 100%;
      }

      body {
        overflow-y: overlay;
        margin: 0;
        font-size: 14px;
        line-height: 1.5715;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 0;
        margin-bottom: 0.5em;
      }

      a {
        text-decoration: none;
        outline: none;
      }

      & * {
        font-family: 'Noto Sans KR', sans-serif !important;
      }
    `}
  />
);

export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <Story />
      <GlobalStyle />
    </ThemeProvider>
  ),
];

export const parameters = {
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#333333',
      },
    ],
  },
};
