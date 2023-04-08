/* eslint-disable react-hooks/exhaustive-deps */
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BiFullscreen } from 'react-icons/bi';
import ReactFlow, { useNodesState, useEdgesState, Node, useReactFlow } from 'reactflow';
import _ from 'lodash';
import { DownNode } from '../../../Components/RoadmapItem/DownNode';
import { LeftNode } from '../../../Components/RoadmapItem/LeftNode';
import { RightNode } from '../../../Components/RoadmapItem/RightNode';
import { RoadmapEdge } from '../../../Components/RoadmapItem/RoadmapEdge';
import { StartNode } from '../../../Components/RoadmapItem/StartNode';
import { StickerNode } from '../../../Components/RoadmapItem/StickerNode';
import { EN_ROADMAP_EDGE_TYPE, EN_ROADMAP_NODE_TYPE, RoadmapItem } from '../../../Interface/roadmap';
import { RoadmapItemDrawer } from './RoadmapItemDrawer';

const nodeTypes = {
  [EN_ROADMAP_NODE_TYPE.StartNode]: StartNode('view'),
  [EN_ROADMAP_NODE_TYPE.DownNode]: DownNode('view'),
  [EN_ROADMAP_NODE_TYPE.LeftNode]: LeftNode('view'),
  [EN_ROADMAP_NODE_TYPE.RigthNode]: RightNode('view'),
  [EN_ROADMAP_NODE_TYPE.StickerNode]: StickerNode('view'),
};

const edgeTypes = {
  [EN_ROADMAP_EDGE_TYPE.RoadmapEdge]: RoadmapEdge,
};

const nodeStateHook = useNodesState<RoadmapItem>;

interface FlowProps {
  nodes: ReturnType<typeof nodeStateHook>[0];
  edges: ReturnType<typeof useEdgesState>[0];
}

export const FlowView = ({ nodes, edges }: FlowProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const { isOpen: isOpenItem, onOpen: onOpenItem, onClose: onCloseItem } = useDisclosure();
  const [roadmapItem, setRoadmapItem] = useState<RoadmapItem | undefined>();

  // 로드맵 크기 조절
  useEffect(() => {
    const nodeContainerEl = document.getElementsByClassName('react-flow__nodes')[0];
    if (!nodeContainerEl || nodeContainerEl.childElementCount == 0 || !containerRef.current || _.isEmpty(nodes)) {
      return;
    }

    const nodeTops: number[] = [];
    const nodeBottoms: number[] = [];
    const nodeLefts: number[] = [];
    const nodeRights: number[] = [];

    const treeWalker = document.createTreeWalker(
      document.getElementsByClassName('react-flow__nodes')[0],
      NodeFilter.SHOW_ELEMENT,
    );
    while (treeWalker.nextNode()) {
      const el = treeWalker.currentNode as HTMLElement;
      const { top, bottom, left, right } = el.getBoundingClientRect();
      nodeTops.push(top);
      nodeBottoms.push(bottom);
      nodeLefts.push(left);
      nodeRights.push(right);
    }

    const height = Math.max(...nodeBottoms) - Math.min(...nodeTops) + 100;
    const width = Math.max(...nodeRights) - Math.min(...nodeLefts) + 100;
    const browserWidth = document.documentElement.clientWidth;

    let adjustHeight = 0;
    if (width > browserWidth) {
      // 너비가 창너비를 초과한 경우
      adjustHeight = (height * browserWidth) / width;
    } else {
      // 창너비보다 작은 경우
      adjustHeight = height;
    }
    containerRef.current.style.height = `${adjustHeight}px`;

    setTimeout(() => {
      fitView();
    }, 200);
  }, [nodes, edges, fitView]);

  const onNodeClick = useCallback(async (event: React.MouseEvent, targetNode: Node<RoadmapItem>) => {
    if (
      ![EN_ROADMAP_NODE_TYPE.DownNode, EN_ROADMAP_NODE_TYPE.LeftNode, EN_ROADMAP_NODE_TYPE.RigthNode].includes(
        targetNode.type as EN_ROADMAP_NODE_TYPE,
      )
    ) {
      return;
    }
    // if (!targetNode.data.description) {
    //   return;
    // }
    setRoadmapItem({ ...targetNode.data });
    onOpenItem();
  }, []);

  const onClickZoomIn = useCallback(
    _.throttle(() => {
      zoomIn();
    }, 200),
    [zoomIn],
  );

  const onClickZoomOut = useCallback(
    _.throttle(() => {
      zoomOut();
    }, 200),
    [zoomOut],
  );

  const onClickFitView = useCallback(
    _.throttle(() => {
      fitView();
    }, 200),
    [fitView],
  );

  return (
    <>
      <div ref={containerRef} style={{ width: '100%', height: 500 }}>
        <ReactFlow
          className="flow-view"
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          elementsSelectable={false}
          minZoom={0}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <Flex position="absolute" top={5} left={5} zIndex={5} gap={2}>
            <Tooltip label="zoom in">
              <IconButton
                aria-label="zoom in"
                icon={<AddIcon />}
                size="sm"
                colorScheme="blackAlpha"
                onClick={onClickZoomIn}
              />
            </Tooltip>
            <Tooltip label="zoom out">
              <IconButton
                aria-label="zoom out"
                icon={<MinusIcon />}
                size="sm"
                colorScheme="blackAlpha"
                onClick={onClickZoomOut}
              />
            </Tooltip>
            <Tooltip label="화면 맞추기">
              <IconButton
                aria-label="화면 맞추기"
                icon={<BiFullscreen />}
                size="sm"
                colorScheme="blackAlpha"
                onClick={onClickFitView}
              />
            </Tooltip>
          </Flex>
        </ReactFlow>
      </div>

      <RoadmapItemDrawer isOpen={isOpenItem} onClose={onCloseItem} roadmapItem={roadmapItem} />
    </>
  );
};
