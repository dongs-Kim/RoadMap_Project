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
import { DownNode } from '../../../Components/RoadmapItem/DownNode';
import { LeftNode } from '../../../Components/RoadmapItem/LeftNode';
import { RightNode } from '../../../Components/RoadmapItem/RightNode';
import { RoadmapEdge } from '../../../Components/RoadmapItem/RoadmapEdge';
import { StartNode } from '../../../Components/RoadmapItem/StartNode';
import { StickerNode } from '../../../Components/RoadmapItem/StickerNode';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import {
  EN_ROADMAP_EDGE_TYPE,
  EN_ROADMAP_HANDLE_ID,
  EN_ROADMAP_NODE_TYPE,
  RoadmapItem,
} from '../../../Interface/roadmap';
import {
  addEdge,
  addEdgeByConnection,
  addNode,
  setEdges,
  setNodes,
  updateNode,
} from '../../../store/roadmapWriteSlice';

const nodeTypes = {
  [EN_ROADMAP_NODE_TYPE.StartNode]: StartNode,
  [EN_ROADMAP_NODE_TYPE.DownNode]: DownNode,
  [EN_ROADMAP_NODE_TYPE.LeftNode]: LeftNode,
  [EN_ROADMAP_NODE_TYPE.RigthNode]: RightNode,
  [EN_ROADMAP_NODE_TYPE.StickerNode]: StickerNode,
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
}

export const RoadmapFlow = ({ openModal }: FlowProps) => {
  const { nodes, edges } = useAppSelector((staet) => staet.roadmapWrite);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const connectingRef = useRef<Pick<OnConnectStartParams, 'nodeId' | 'handleId'> | null>(null);
  const { project } = useReactFlow();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(setNodes(applyNodeChanges(changes, nodes)));
    },
    [dispatch, nodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(setEdges(applyEdgeChanges(changes, edges)));
    },
    [dispatch, edges],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      dispatch(addEdgeByConnection(params));
    },
    [dispatch],
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
      const newNode: Node<RoadmapItem> = {
        id: nodeId,
        position,
        type: getNodeType(connectingRef.current.handleId),
        data: { name: '항목', description: '', bgcolor: '#ffffff', border: true },
      };
      const newEdge: Edge = {
        id: shortUUID.generate(),
        source: connectingRef.current.nodeId,
        sourceHandle: connectingRef.current.handleId,
        target: nodeId,
        type: EN_ROADMAP_EDGE_TYPE.RoadmapEdge,
      };

      dispatch(addNode(newNode));
      dispatch(addEdge(newEdge));
    },
    [project, dispatch],
  );

  const onNodeDoubleClick = useCallback(
    async (event: React.MouseEvent, targetNode: Node<RoadmapItem>) => {
      const data = await openModal({ ...targetNode.data }, targetNode.type);
      if (data) {
        dispatch(updateNode({ id: targetNode.id, data }));
      }
    },
    [openModal, dispatch],
  );

  const onEdgeDoubleClick = useCallback(
    async (event: React.MouseEvent, targetEdge: Edge) => {
      const data = await openModal({ ...targetEdge.data }, targetEdge.type);
      if (data) {
        dispatch(updateNode({ id: targetEdge.id, data }));
      }
    },
    [openModal, dispatch],
  );

  return (
    <>
      <div ref={containerRef} style={{ height: 'calc(100% - 64.67px)' }}>
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
          snapToGrid={true}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  );
};
