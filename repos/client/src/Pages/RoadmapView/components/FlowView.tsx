import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, Node, useReactFlow } from 'reactflow';
import { DownNode } from '../../../Components/RoadmapItem/DownNode';
import { LeftNode } from '../../../Components/RoadmapItem/LeftNode';
import { RightNode } from '../../../Components/RoadmapItem/RightNode';
import { StartNode } from '../../../Components/RoadmapItem/StartNode';
import { StickerNode } from '../../../Components/RoadmapItem/StickerNode';
import { EN_ROADMAP_NODE_TYPE, RoadmapItem } from '../../../Interface/roadmap';

const nodeTypes = {
  [EN_ROADMAP_NODE_TYPE.StartNode]: StartNode,
  [EN_ROADMAP_NODE_TYPE.DownNode]: DownNode,
  [EN_ROADMAP_NODE_TYPE.LeftNode]: LeftNode,
  [EN_ROADMAP_NODE_TYPE.RigthNode]: RightNode,
  [EN_ROADMAP_NODE_TYPE.StickerNode]: StickerNode,
};

const nodeStateHook = useNodesState<RoadmapItem>;

interface FlowProps {
  nodes: ReturnType<typeof nodeStateHook>[0];
  edges: ReturnType<typeof useEdgesState>[0];
  openModal(data: RoadmapItem, nodeType?: string): void;
}

export const FlowView = ({ nodes, edges, openModal }: FlowProps) => {
  const [height, setHeight] = useState(500);
  const { fitView } = useReactFlow();

  const onNodeClick = useCallback(
    async (event: React.MouseEvent, targetNode: Node<RoadmapItem>) => {
      openModal({ ...targetNode.data }, targetNode.type);
    },
    [openModal],
  );

  useEffect(() => {
    const nodeContainerEl = document.getElementsByClassName('react-flow__nodes')[0];
    if (!nodeContainerEl) {
      return;
    }

    const treeWalker = document.createTreeWalker(
      document.getElementsByClassName('react-flow__nodes')[0],
      NodeFilter.SHOW_ELEMENT,
    );

    const nodeTops: number[] = [];
    const nodeBottoms: number[] = [];
    while (treeWalker.nextNode()) {
      const el = treeWalker.currentNode as HTMLElement;
      const { top, bottom } = el.getBoundingClientRect();
      nodeTops.push(top);
      nodeBottoms.push(bottom);
    }

    const height = Math.max(...nodeBottoms) - Math.min(...nodeTops) + 100;
    console.log(height);
    setHeight(height);

    setTimeout(() => {
      fitView();
    });
  }, [nodes, fitView]);

  return (
    <>
      <div style={{ width: '100%', height }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          elementsSelectable={false}
          maxZoom={1}
          fitView
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        />
      </div>
    </>
  );
};
