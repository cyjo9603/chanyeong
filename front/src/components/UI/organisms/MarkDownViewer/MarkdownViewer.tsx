import React from 'react';

import { resetToc } from '@store/postToc';
import { MarkdownWrapper } from './styled';
import renderers from './renderers';

interface Props {
  content: string;
}

const MarkdownViewer = ({ content }: Props) => {
  resetToc();

  return <MarkdownWrapper renderers={renderers}>{content}</MarkdownWrapper>;
};

export default MarkdownViewer;
