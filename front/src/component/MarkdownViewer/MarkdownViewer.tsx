import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

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
      <SyntaxHighlighter style={docco} language={language}>
        {value}
      </SyntaxHighlighter>
    );
  },
};

const MarkdownViewer = ({ content }: Props) => {
  return <ReactMarkdown renderers={renderers}>{content}</ReactMarkdown>;
};

export default MarkdownViewer;
