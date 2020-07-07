import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { ThemeType } from './index';

export default createGlobalStyle<{ theme: ThemeType }>`
  ${reset}

  html, body, #__next{
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

  h1, h2, h3, h4, h5, h6 {
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
    background: ${({ theme }) => theme.BACKGROUND_COLOR};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.PRIMARY_FONT};
  }
`;
