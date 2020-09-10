import React, { forwardRef, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import styled from 'styled-components';

import { TUIEditorWithForwardedProps } from './TUIEditorWrapper';
import { getUploadImageUrl, TYPE_FOLDER_POST } from '../../lib/uploadImage';

interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

const Editor = dynamic<TUIEditorWithForwardedProps>(() => import('./TUIEditorWrapper'), { ssr: false });
const EditorWithForwardedRef = forwardRef<EditorType | undefined, EditorPropsWithHandlers>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));

interface Props extends EditorProps {
  onChange(value: string): void;
  setImage(imgUrl: string): void;

  valueType?: 'markdown' | 'html';
}

const TUIEditor = (props: Props) => {
  const { initialValue, previewStyle, height, initialEditType, useCommandShortcut, setImage } = props;

  const editorRef = useRef<EditorType>();
  const handleChange = useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();
    const valueType = props.valueType || 'markdown';

    props.onChange(valueType === 'markdown' ? instance.getMarkdown() : instance.getHtml());
  }, [props, editorRef]);

  const addImageBlobHook = useCallback(async (blob, callback) => {
    const url = await getUploadImageUrl(blob, TYPE_FOLDER_POST);

    setImage(url);
    callback(url, blob.name);
  }, []);

  const hooks = { addImageBlobHook };

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css" />
        <link rel="stylesheet" href="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/github.min.css"
        />
      </Helmet>
      <EditorWrapper>
        <EditorWithForwardedRef
          {...props}
          initialValue={initialValue || 'hello react editor world!'}
          previewStyle={previewStyle || 'vertical'}
          height={height || '700px'}
          initialEditType={initialEditType || 'markdown'}
          useCommandShortcut={useCommandShortcut || true}
          ref={editorRef}
          onChange={handleChange}
          hooks={hooks}
        />
      </EditorWrapper>
    </>
  );
};

const EditorWrapper = styled.div`
  & .te-preview {
    background-color: #fff;
  }
`;

export default TUIEditor;
