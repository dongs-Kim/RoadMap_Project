import { useCallback, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  OnConnectStartParams,
  useReactFlow,
  Node,
} from 'reactflow';
import shortUUID from 'short-uuid';
import { DownNode } from '../../Components/RoadmapItem/DownNode';
import { LeftNode } from '../../Components/RoadmapItem/LeftNode';
import { RightNode } from '../../Components/RoadmapItem/RightNode';
import { StartNode } from '../../Components/RoadmapItem/StartNode';
import { StickerNode } from '../../Components/RoadmapItem/StickerNode';
import { EN_ROADMAP_HANDLE_ID, EN_ROADMAP_NODE_TYPE, RoadmapItem } from '../../Interface/roadmap';

const nodeTypes = {
  [EN_ROADMAP_NODE_TYPE.StartNode]: StartNode,
  [EN_ROADMAP_NODE_TYPE.DownNode]: DownNode,
  [EN_ROADMAP_NODE_TYPE.LeftNode]: LeftNode,
  [EN_ROADMAP_NODE_TYPE.RigthNode]: RightNode,
  [EN_ROADMAP_NODE_TYPE.StickerNode]: StickerNode,
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

const nodeStateHook = useNodesState<RoadmapItem>;

interface FlowProps {
  nodes: ReturnType<typeof nodeStateHook>[0];
  setNodes: ReturnType<typeof nodeStateHook>[1];
  onNodesChange: ReturnType<typeof nodeStateHook>[2];
  edges: ReturnType<typeof useEdgesState>[0];
  setEdges: ReturnType<typeof useEdgesState>[1];
  onEdgesChange: ReturnType<typeof useEdgesState>[2];
  openModal(data: RoadmapItem, nodeType?: string): Promise<RoadmapItem | void>;
}

export const Flow = ({ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, openModal }: FlowProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const connectingRef = useRef<Pick<OnConnectStartParams, 'nodeId' | 'handleId'> | null>(null);
  const { project } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds: Edge[]) => addEdge(params, eds));
    },
    [setEdges],
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
        data: { name: '항목', description: '' },
      };
      const newEdge: Edge = {
        id: shortUUID.generate(),
        source: connectingRef.current.nodeId,
        sourceHandle: connectingRef.current.handleId,
        target: nodeId,
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(newEdge));
    },
    [project, setEdges, setNodes],
  );

  const onNodeDoubleClick = useCallback(
    async (event: React.MouseEvent, targetNode: Node<RoadmapItem>) => {
      const data = await openModal({ ...targetNode.data }, targetNode.type);
      if (data) {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === targetNode.id) {
              node.data = data;
            }
            return node;
          }),
        );
      }
    },
    [openModal, setNodes],
  );

  return (
    <>
      <div ref={containerRef} style={{ height: 600 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  );
};
