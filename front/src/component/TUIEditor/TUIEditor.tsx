import React, { forwardRef, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import axios from 'axios';
import styled from 'styled-components';
import { TUIEditorWithForwardedProps } from './TUIEditorWrapper';

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
    const name = `${+new Date()}${blob.name}`;
    const res = await axios.put(`${process.env.IMAGE_UPLOAD_URL}post/${name}&overwrite=true`, blob, {
      headers: {
        Authorization: process.env.IMAGE_UPLOAD_SECRET_KEY,
        'Content-Type': 'application/octet-stream',
      },
    });

    setImage(res.data.file.url);
    callback(res.data.file.url, 'image');
  }, []);

  const hooks = { addImageBlobHook };

  return (
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
  );
};

const EditorWrapper = styled.div`
  & .te-preview {
    background-color: #fff;
  }
`;

export default TUIEditor;
