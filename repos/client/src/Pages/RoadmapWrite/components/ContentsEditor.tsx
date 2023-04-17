import { useRef, useEffect, useContext } from 'react';
import Editor from '@toast-ui/editor';
import { EditorContext } from '../contexts/EditorContext';
import { toastError } from '../../../Utils/toast';

export const ContentsEditor = () => {
  const editorElRef = useRef<HTMLDivElement | null>(null);
  const { setEditor, mode } = useContext(EditorContext);

  // 에디터 생성
  useEffect(() => {
    if (editorElRef.current) {
      const editor = new Editor({
        el: editorElRef.current,
        initialValue: ' ',
        initialEditType: 'markdown',
        previewStyle: 'tab',
        placeholder: '설명을 입력하세요',
        hooks: {
          addImageBlobHook(blob, callback) {
            if (!blob.type.startsWith('image/')) {
              toastError('이미지를 업로드해 주세요');
              return;
            }
            callback('/sample.png');
          },
        },
      });

      // 에디터를 context에 설정
      setEditor(editor);

      // 에디터 오류로 인해 초기값을 공백으로 설정해서 잘못된 값을 지운 후 다시 빈 문자열로 설정한다
      if (mode === 'new') {
        setTimeout(() => {
          editor.setMarkdown('');
        });
      }
    }
  }, [editorElRef, setEditor, mode]);

  return <div ref={editorElRef} style={{ flex: 1, minHeight: '500px' }}></div>;
};
