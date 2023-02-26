import { useCallback, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  OnConnectStartParams,
  useReactFlow,
  Node,
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
} from 'reactflow';
import shortUUID from 'short-uuid';
import _ from 'lodash';
import { DownNode } from '../../../Components/RoadmapItem/DownNode';
import { LeftNode } from '../../../Components/RoadmapItem/LeftNode';
import { RightNode } from '../../../Components/RoadmapItem/RightNode';
import { RoadmapEdge } from '../../../Components/RoadmapItem/RoadmapEdge';
import { StartNode } from '../../../Components/RoadmapItem/StartNode';
import { StickerNode } from '../../../Components/RoadmapItem/StickerNode';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import {
  EdgeData,
  EN_ROADMAP_EDGE_TYPE,
  EN_ROADMAP_HANDLE_ID,
  EN_ROADMAP_NODE_TYPE,
  RoadmapItem,
} from '../../../Interface/roadmap';
import { addEdge, addNode, setEdges, setNodes, updateEdge, updateNode } from '../../../store/roadmapWriteSlice';
import { useRedoUndo } from '../../../Hooks/useRedoUndo';

const nodeTypes = {
  [EN_ROADMAP_NODE_TYPE.StartNode]: StartNode('write'),
  [EN_ROADMAP_NODE_TYPE.DownNode]: DownNode('write'),
  [EN_ROADMAP_NODE_TYPE.LeftNode]: LeftNode('write'),
  [EN_ROADMAP_NODE_TYPE.RigthNode]: RightNode('write'),
  [EN_ROADMAP_NODE_TYPE.StickerNode]: StickerNode('write'),
};

const edgeTypes = {
  [EN_ROADMAP_EDGE_TYPE.RoadmapEdge]: RoadmapEdge,
};

const getClientXY = (event: MouseEvent | TouchEvent) => {
  if ('touches' in event) {
    return {
      clientX: event.touches[0].clientX,
      clientY: event.touches[0].clientY,
    };
  }
  return {
    clientX: event.clientX,
    clientY: event.clientY,
  };
};

const getNodeType = (handleId: string) => {
  switch (handleId) {
    case EN_ROADMAP_HANDLE_ID.Top:
      return EN_ROADMAP_NODE_TYPE.StartNode;
    case EN_ROADMAP_HANDLE_ID.Left:
      return EN_ROADMAP_NODE_TYPE.LeftNode;
    case EN_ROADMAP_HANDLE_ID.Right:
      return EN_ROADMAP_NODE_TYPE.RigthNode;
    default:
      return EN_ROADMAP_NODE_TYPE.DownNode;
  }
};

interface FlowProps {
  openModal(data: RoadmapItem, nodeType?: string): Promise<RoadmapItem | void>;
  openEdgeModal(data: EdgeData): Promise<EdgeData | void>;
}

export const RoadmapFlow = ({ openModal, openEdgeModal }: FlowProps) => {
  const { nodes, edges } = useAppSelector((staet) => staet.roadmapWrite);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const connectingRef = useRef<Pick<OnConnectStartParams, 'nodeId' | 'handleId'> | null>(null);
  const { project } = useReactFlow();
  const { addHistory, onRedoUndoKeyDown } = useRedoUndo();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(setNodes(applyNodeChanges(changes, nodes)));
      addHistory();
    },
    [dispatch, nodes, addHistory],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(setEdges(applyEdgeChanges(changes, edges)));
      addHistory();
    },
    [dispatch, edges, addHistory],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.sourceHandle || !params.target) {
        return;
      }

      const newEdge: Edge<EdgeData> = {
        id: shortUUID.generate(),
        source: params.source,
        sourceHandle: params.sourceHandle,
        target: params.target,
        targetHandle: params.targetHandle,
        type: EN_ROADMAP_EDGE_TYPE.RoadmapEdge,
        data: {
          color: '#2b78e4',
          lineType: params.sourceHandle === EN_ROADMAP_HANDLE_ID.Bottom ? 'solid' : 'dash',
        },
      };
      dispatch(addEdge(newEdge));
      addHistory();
    },
    [dispatch, addHistory],
  );

  const onConnectStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent, { nodeId, handleId }: OnConnectStartParams) => {
      connectingRef.current = { nodeId, handleId };
    },
    [],
  );

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      const targetIsPane = target.classList.contains('react-flow__pane');
      if (
        !targetIsPane ||
        !containerRef.current ||
        !connectingRef.current?.nodeId ||
        !connectingRef.current?.handleId
      ) {
        return;
      }

      const { top, left } = containerRef.current.getBoundingClientRect();
      const nodeId = shortUUID.generate();
      const { clientX, clientY } = getClientXY(event);
      const position = project({ x: clientX - left - 75, y: clientY - top });
      const maxZIndex = _.maxBy(nodes, (node) => node.zIndex ?? 0)?.zIndex ?? 0;

      const newNode: Node<RoadmapItem> = {
        id: nodeId,
        position,
        type: getNodeType(connectingRef.current.handleId),
        data: { name: '', description: '', bgcolor: '#ffffff', border: true },
        zIndex: maxZIndex + 1,
      };
      const newEdge: Edge<EdgeData> = {
        id: shortUUID.generate(),
        source: connectingRef.current.nodeId,
        sourceHandle: connectingRef.current.handleId,
        target: nodeId,
        type: EN_ROADMAP_EDGE_TYPE.RoadmapEdge,
        data: {
          color: '#2b78e4',
          lineType: newNode.type === EN_ROADMAP_NODE_TYPE.DownNode ? 'solid' : 'dash',
        },
      };

      dispatch(addNode(newNode));
      dispatch(addEdge(newEdge));
      addHistory();
    },
    [project, dispatch, nodes, addHistory],
  );

  const onNodeDoubleClick = useCallback(
    async (event: React.MouseEvent, targetNode: Node<RoadmapItem>) => {
      const data = await openModal({ ...targetNode.data }, targetNode.type);
      if (data) {
        dispatch(updateNode({ id: targetNode.id, data }));
        addHistory();
      }
    },
    [openModal, dispatch, addHistory],
  );

  const onEdgeDoubleClick = useCallback(
    async (event: React.MouseEvent, targetEdge: Edge) => {
      const data = await openEdgeModal({ ...targetEdge.data });
      if (data) {
        dispatch(updateEdge({ id: targetEdge.id, data }));
        addHistory();
      }
    },
    [openEdgeModal, dispatch, addHistory],
  );

  return (
    <>
      <div ref={containerRef} tabIndex={-1} style={{ height: 'calc(100% - 64.67px)' }} onKeyDown={onRedoUndoKeyDown}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          snapToGrid
          fitView
          fitViewOptions={{
            maxZoom: 1,
          }}
          deleteKeyCode="Delete"
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  );
};
