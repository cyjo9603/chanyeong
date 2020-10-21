import styled from 'styled-components';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';

import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import scss from 'react-syntax-highlighter/dist/esm/languages/hljs/scss';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/htmlbars';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('css', scss);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('json', json);

export const SyntaxWrapper = styled(SyntaxHighlighter)`
  background-color: ${({ theme }) => theme.CODE_BACKGROUND} !important;

  & code {
    color: ${({ theme }) => theme.PRIMARY_FONT} !important;
    text-shadow: none !important;
  }

  & .hljs-keyword {
    color: ${({ theme }) => theme.CODE_KEWORD};
  }
  & .hljs-string {
    color: ${({ theme }) => theme.CODE_STRING};
  }
  & .hljs-number {
    color: ${({ theme }) => theme.CODE_NUMBER};
  }
  & .hljs-variable {
    color: ${({ theme }) => theme.CODE_VAR};
  }
  & .hljs-selector-tag {
    color: ${({ theme }) => theme.CODE_TAG};
  }
  & .hljs-selector-id {
    color: ${({ theme }) => theme.CODE_ID};
  }
  & .hljs-attribute {
    color: ${({ theme }) => theme.CODE_ATTRIBUTE};
  }
  & .hljs-tag {
    color: ${({ theme }) => theme.CODE_HTML};
  }
`;

export const MarkdownWrapper = styled(ReactMarkdown)`
  & p,
  :link,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li,
  td {
    color: ${({ theme }) => theme.PRIMARY_FONT};
  }

  & blockquote {
    border-left: 4px solid #20c997;
    padding: 0 16px;
    vertical-align: baseline;

    & > p {
      font-size: 18px;
    }
  }
  & td {
    border: 1px solid ${({ theme }) => theme.BORDER_LINE_GREY};
  }

  & p,
  li {
    font-size: 14px;
    line-height: 2;
  }
  & p {
    margin: 18px 0;
  }
  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 20px 0 15px;
  }
  & img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
`;

export const InlineCode = styled.code`
  background-color: ${({ theme }) => theme.CODE_BACKGROUND};
  color: ${({ theme }) => theme.CODE_INLINE};
  padding: 2px 3px;
`;
