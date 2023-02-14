import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import { useRef } from 'react';

export const useViewer = (viewerElRef: React.RefObject<HTMLElement | null>, value?: string) => {
  const viewerRef = useRef<Viewer | null>(null);

  // 뷰어 생성
  setTimeout(() => {
    if (viewerElRef.current) {
      viewerRef.current = new Viewer({
        el: viewerElRef.current,
        initialValue: value || ' ',
      });
    }
  });

  return viewerRef;
};
