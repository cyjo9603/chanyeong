import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import axios from 'axios';
import { TUIEditorWithForwardedProps } from './TUIEditorWrapper';
import { IMAGE_UPLOAD_API_KEY, IMAGE_UPLOAD_URL } from '../../secret';

interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

const Editor = dynamic<TUIEditorWithForwardedProps>(() => import('./TUIEditorWrapper'), { ssr: false });
const EditorWithForwardedRef = forwardRef<EditorType | undefined, EditorPropsWithHandlers>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));

interface Props extends EditorProps {
  onChange(value: string): void;
  onClick(value: string): void;
  registrationTitleImage(imgUrl: string): void;

  valueType?: 'markdown' | 'html';
}

const TUIEditor = (props: Props) => {
  const { initialValue, previewStyle, height, initialEditType, useCommandShortcut, registrationTitleImage } = props;

  const editorRef = React.useRef<EditorType>();
  const handleChange = React.useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();
    const valueType = props.valueType || 'markdown';

    props.onChange(valueType === 'markdown' ? instance.getMarkdown() : instance.getHtml());
  }, [props, editorRef]);

  const hooks = {
    async addImageBlobHook(blob, callback) {
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('api_key', IMAGE_UPLOAD_API_KEY);
      formData.append('upload_preset', 'xtaoaopp');
      formData.append('timestamp', String(Date.now() / 1000));
      const {
        data: { secure_url },
      } = await axios.post(IMAGE_UPLOAD_URL, formData);
      registrationTitleImage(secure_url);
      callback(secure_url, 'image');
    },
  };

  return (
    <div>
      <EditorWithForwardedRef
        {...props}
        initialValue={initialValue || 'hello react editor world!'}
        previewStyle={previewStyle || 'vertical'}
        height={height || '600px'}
        initialEditType={initialEditType || 'markdown'}
        useCommandShortcut={useCommandShortcut || true}
        ref={editorRef}
        onChange={handleChange}
        hooks={hooks}
      />
    </div>
  );
};

export default TUIEditor;
