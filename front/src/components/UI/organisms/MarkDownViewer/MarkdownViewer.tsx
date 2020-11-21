import React from 'react';
import { MarkdownWrapper } from './styled';
import renderers from './renderers';

interface Props {
  content: string;
}

const MarkdownViewer = ({ content }: Props) => {
  return <MarkdownWrapper renderers={renderers}>{content}</MarkdownWrapper>;
};

export default MarkdownViewer;
