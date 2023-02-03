import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import { useEffect, useRef } from 'react';

export const useViewer = (viewerElRef: React.RefObject<HTMLElement | null>, value?: string) => {
  const viewerRef = useRef<Viewer | null>(null);

  // 뷰어 생성
  useEffect(() => {
    setTimeout(() => {
      if (viewerElRef.current) {
        viewerRef.current = new Viewer({
          el: viewerElRef.current,
          initialValue: value || ' ',
        });
      }
    });
  }, [viewerElRef, value]);

  return viewerRef.current;
};
