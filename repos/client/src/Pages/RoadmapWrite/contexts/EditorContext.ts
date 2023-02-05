/* eslint-disable @typescript-eslint/no-empty-function */
import Editor from '@toast-ui/editor';
import { createContext } from 'react';

interface EditorContext {
  editor: Editor | null;
  setEditor(editor: Editor): void;
  mode: 'new' | 'modify' | 'copy';
  roadmapId?: string;
}

export const EditorContext = createContext<EditorContext>({
  editor: null,
  setEditor: () => {},
  mode: 'new',
});
