import styled from 'styled-components';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

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
