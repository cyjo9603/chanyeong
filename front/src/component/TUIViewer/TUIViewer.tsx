import React from 'react';
import { Viewer } from '@toast-ui/react-editor';

interface Props {
  content: string;
}

const TUIViewer = ({ content }: Props) => <Viewer initialValue={content} />;

export default TUIViewer;
