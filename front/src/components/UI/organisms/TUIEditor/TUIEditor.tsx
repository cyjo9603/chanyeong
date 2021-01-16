import React from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

export interface TUIEditorWithForwardedProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

const TUIEditor = (props: TUIEditorWithForwardedProps) => (
  <>
    <Editor plugins={[colorSyntax]} {...props} ref={props.forwardedRef} />
  </>
);

export default TUIEditor;
