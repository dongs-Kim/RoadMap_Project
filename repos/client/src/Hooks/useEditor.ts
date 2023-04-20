import Editor from '@toast-ui/editor';
import { useEffect, useRef } from 'react';

export const useEditor = (editorElRef: React.RefObject<HTMLElement | null>, loader?: unknown) => {
  const editorRef = useRef<Editor | null>(null);

  // 에디터 생성
  useEffect(() => {
    setTimeout(() => {
      if (editorElRef.current) {
        editorRef.current = new Editor({
          el: editorElRef.current,
          height: '500px',
          initialValue: ' ',
          initialEditType: 'wysiwyg',
          previewStyle: 'tab',
        });
      }
    });
  }, [editorElRef, loader]);

  return editorRef.current;
};
