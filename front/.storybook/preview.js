import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../src/theme';
import GlobalStyle from '../src/theme/globalStyle';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
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
