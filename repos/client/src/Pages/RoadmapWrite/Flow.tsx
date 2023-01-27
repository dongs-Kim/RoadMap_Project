import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
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
import { EN_ROADMAP_HANDLE_ID, EN_ROADMAP_NODE_TYPE, RoadmapNodeData } from '../../Interface/roadmap';
import './flow.css';

const initialNodes = [
  {
    id: shortUUID.generate(),
    type: 'startNode',
    data: { label: '시작' },
    position: { x: 100, y: 50 },
  },
];

const nodeTypes = {
  [EN_ROADMAP_NODE_TYPE.StartNode]: StartNode,
  [EN_ROADMAP_NODE_TYPE.DownNode]: DownNode,
  [EN_ROADMAP_NODE_TYPE.LeftNode]: LeftNode,
  [EN_ROADMAP_NODE_TYPE.RigthNode]: RightNode,
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

export const Flow = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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
      const id = shortUUID.generate();
      const { clientX, clientY } = getClientXY(event);
      const position = project({ x: clientX - left - 75, y: clientY - top });
      const newNode: Node<RoadmapNodeData> = {
        id,
        position,
        type: getNodeType(connectingRef.current.handleId),
        data: { label: `Node` },
      };
      const newEdge: Edge = {
        id,
        source: connectingRef.current.nodeId,
        sourceHandle: connectingRef.current.handleId,
        target: id,
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(newEdge));
    },
    [project, setEdges, setNodes],
  );

  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node<RoadmapNodeData>) => {
      //
      onOpen();
    },
    [onOpen],
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
          // fitView
          // fitViewOptions={fitViewOptions}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>로드맵 항목</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>항목명</FormLabel>
              <Input type="text" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              적용
            </Button>
            <Button variant="ghost" onClick={onClose}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
