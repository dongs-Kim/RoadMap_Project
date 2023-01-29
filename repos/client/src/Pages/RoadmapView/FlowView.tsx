import { useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, Node } from 'reactflow';
import { DownNode } from '../../Components/RoadmapItem/DownNode';
import { LeftNode } from '../../Components/RoadmapItem/LeftNode';
import { RightNode } from '../../Components/RoadmapItem/RightNode';
import { StartNode } from '../../Components/RoadmapItem/StartNode';
import { EN_ROADMAP_NODE_TYPE, RoadmapItem } from '../../Interface/roadmap';

const nodeTypes = {
  [EN_ROADMAP_NODE_TYPE.StartNode]: StartNode,
  [EN_ROADMAP_NODE_TYPE.DownNode]: DownNode,
  [EN_ROADMAP_NODE_TYPE.LeftNode]: LeftNode,
  [EN_ROADMAP_NODE_TYPE.RigthNode]: RightNode,
};

const nodeStateHook = useNodesState<RoadmapItem>;

interface FlowProps {
  nodes: ReturnType<typeof nodeStateHook>[0];
  edges: ReturnType<typeof useEdgesState>[0];
  openModal(data: RoadmapItem): void;
}

export const FlowView = ({ nodes, edges, openModal }: FlowProps) => {
  const onNodeClick = useCallback(
    async (event: React.MouseEvent, targetNode: Node<RoadmapItem>) => {
      openModal({ ...targetNode.data });
    },
    [openModal],
  );

  return (
    <>
      <div style={{ height: 600 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          elementsSelectable={false}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  );
};
