import React from 'react';
import { ThemeProvider } from 'styled-components';

import { lightTheme } from '@theme';
import GlobalStyle from '@theme/globalStyle';

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
