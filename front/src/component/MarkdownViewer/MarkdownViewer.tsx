import React from 'react';
import cb from 'react-syntax-highlighter/dist/esm/styles/prism/cb';

import { SyntaxWrapper, MarkdownWrapper, InlineCode } from './styled';

interface Props {
  content: string;
}

interface RenderersProps {
  language?: string;
  value: string;
}

const renderers = {
  code: ({ language, value }: RenderersProps) => (
    <SyntaxWrapper style={cb} language={language}>
      {value}
    </SyntaxWrapper>
  ),

  inlineCode: ({ value }: RenderersProps) => <InlineCode>{value}</InlineCode>,
};

const MarkdownViewer = ({ content }: Props) => {
  return <MarkdownWrapper renderers={renderers}>{content}</MarkdownWrapper>;
};

export default MarkdownViewer;
