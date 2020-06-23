import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import hljs from 'highlight.js/lib/highlight';

import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/htmlbars';
import json from 'highlight.js/lib/languages/json';

import { ViewerWrapper } from './styled';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
hljs.registerLanguage('json', json);

interface Props {
  content: string;
}

const TUIViewer = ({ content }: Props) => (
  <ViewerWrapper>
    <Viewer initialValue={content} plugins={[codeSyntaxHighlight.bind(hljs)]} />
  </ViewerWrapper>
);

export default TUIViewer;
