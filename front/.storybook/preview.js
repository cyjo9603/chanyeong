import React from 'react';
import { ThemeProvider } from 'emotion-theming';

import GlobalStyle from '@theme/globalStyle';
import { lightTheme } from '@theme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <Story />
      <GlobalStyle theme={lightTheme} />
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
