/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core';
import reset from 'emotion-reset';

import { ThemeType } from './index';

interface GlobalStyleProps {
  theme: ThemeType;
}

const GlobalStyle = ({ theme }: GlobalStyleProps) => (
  <Global
    styles={css`
      ${reset}

      html, body, #__next {
        height: 100%;
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

      ::-webkit-scrollbar {
        width: 6px;
        background: ${theme.BACKGROUND_COLOR};
      }

      ::-webkit-scrollbar-thumb {
        background-color: ${theme.PRIMARY_FONT};
      }
    `}
  />
);

export default GlobalStyle;
