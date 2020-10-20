import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/esm/styles/prism/cb';

import { SyntaxWrapper } from './styled';

interface Props {
  content: string;
}

interface RenderersProps {
  language: string;
  value: string;
}

const renderers = {
  code: ({ language, value }: RenderersProps) => {
    return (
      <SyntaxWrapper style={docco} language={language}>
        {value}
      </SyntaxWrapper>
    );
  },
};

const MarkdownViewer = ({ content }: Props) => {
  return <ReactMarkdown renderers={renderers}>{content}</ReactMarkdown>;
};

export default MarkdownViewer;
