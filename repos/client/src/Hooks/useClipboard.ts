import { useCallback, KeyboardEvent } from 'react';
import { Edge, Node } from 'reactflow';
import shortUUID from 'short-uuid';
import { EdgeData, RoadmapItem } from '../Interface/roadmap';
import { setClipboard as setClipboardAction, setEdges, setNodes } from '../store/roadmapWriteSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export const useClipboard = () => {
  const dispatch = useAppDispatch();
  const { clipboard, nodes, edges } = useAppSelector((state) => state.roadmapWrite);

  const copy = useCallback(() => {
    dispatch(setClipboardAction());
  }, [dispatch]);

  const paste = useCallback(() => {
    if (!clipboard) {
      return;
    }

    const nodeIdMap: { [key: string]: string } = {};
    const pasteNodes = clipboard.nodes.map<Node<RoadmapItem>>((node) => {
      nodeIdMap[node.id] = shortUUID.generate();
      return {
        ...node,
        id: nodeIdMap[node.id],
        position: { x: node.position.x + 20, y: node.position.y + 20 },
        selected: true,
      };
    });
    const newNodes = nodes.map<Node<RoadmapItem>>((node) => ({ ...node, selected: false })).concat(pasteNodes);

    const pasteEdges = clipboard.edges.map<Edge<EdgeData>>((edge) => {
      return {
        ...edge,
        id: shortUUID.generate(),
        source: nodeIdMap[edge.source] || edge.source,
        target: nodeIdMap[edge.target] || edge.target,
        selected: true,
      };
    });
    const newEdges = edges.map<Edge<EdgeData>>((edge) => ({ ...edge, selected: false })).concat(pasteEdges);

    dispatch(setNodes(newNodes));
    dispatch(setEdges(newEdges));
  }, [clipboard, nodes, edges, dispatch]);

  const onClipboardKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        copy();
        return;
      }
      if (e.ctrlKey && e.key === 'v') {
        paste();
        return;
      }
    },
    [copy, paste],
  );

  return { copy, paste, onClipboardKeyDown };
};
