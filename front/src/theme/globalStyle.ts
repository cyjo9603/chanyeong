import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
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
    overflow-y: scroll;
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
`;
