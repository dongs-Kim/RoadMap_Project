import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, Node, useReactFlow } from 'reactflow';
import { DownNode } from '../../../Components/RoadmapItem/DownNode';
import { LeftNode } from '../../../Components/RoadmapItem/LeftNode';
import { RightNode } from '../../../Components/RoadmapItem/RightNode';
import { RoadmapEdge } from '../../../Components/RoadmapItem/RoadmapEdge';
import { StartNode } from '../../../Components/RoadmapItem/StartNode';
import { StickerNode } from '../../../Components/RoadmapItem/StickerNode';
import { EN_ROADMAP_EDGE_TYPE, EN_ROADMAP_NODE_TYPE, RoadmapItem } from '../../../Interface/roadmap';

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

const nodeStateHook = useNodesState<RoadmapItem>;

interface FlowProps {
  nodes: ReturnType<typeof nodeStateHook>[0];
  edges: ReturnType<typeof useEdgesState>[0];
  openModal(data: RoadmapItem, nodeType?: string): void;
}

export const FlowView = ({ nodes, edges, openModal }: FlowProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { fitView, getZoom } = useReactFlow();

  const onNodeClick = useCallback(
    async (event: React.MouseEvent, targetNode: Node<RoadmapItem>) => {
      openModal({ ...targetNode.data }, targetNode.type);
    },
    [openModal],
  );

  useEffect(() => {
    const nodeContainerEl = document.getElementsByClassName('react-flow__nodes')[0];
    if (!nodeContainerEl || nodeContainerEl.childElementCount == 0 || !containerRef.current) {
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

    fitView();
  }, [nodes, edges, fitView]);

  return (
    <>
      <div ref={containerRef} style={{ width: '100%', height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          elementsSelectable={false}
          maxZoom={1}
          minZoom={0}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        />
      </div>
    </>
  );
};
