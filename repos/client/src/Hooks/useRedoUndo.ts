import { useCallback, KeyboardEvent } from 'react';
import _ from 'lodash';
import {
  addHistory as addHistoryAction,
  setEdges,
  setNodes,
  undoHistory as undoHistoryAction,
  redoHistory as redoHistoryAction,
} from '../store/roadmapWriteSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export const useRedoUndo = () => {
  const dispatch = useAppDispatch();
  const { history, undoHistory } = useAppSelector((state) => state.roadmapWrite);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addHistory = useCallback(
    _.debounce(() => {
      dispatch(addHistoryAction());
    }, 200),
    [dispatch],
  );

  const undo = useCallback(() => {
    if (history.length <= 1) {
      return;
    }
    const last = history[history.length - 2];
    dispatch(setNodes(last.nodes));
    dispatch(setEdges(last.edges));
    dispatch(undoHistoryAction());
  }, [history, dispatch]);

  const redo = useCallback(() => {
    if (!undoHistory.length) {
      return;
    }
    const last = undoHistory[undoHistory.length - 1];
    dispatch(setNodes(last.nodes));
    dispatch(setEdges(last.edges));
    dispatch(redoHistoryAction());
  }, [undoHistory, dispatch]);

  const onRedoUndoKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.ctrlKey && e.key === 'z') {
        undo();
        return;
      }
      if (e.ctrlKey && e.key === 'y') {
        redo();
        return;
      }
    },
    [redo, undo],
  );

  return { addHistory, redo, undo, onRedoUndoKeyDown };
};
