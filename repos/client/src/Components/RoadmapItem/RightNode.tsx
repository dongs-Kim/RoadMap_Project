import { Handle, NodeProps, Position } from 'reactflow';
import { NodeMode, RoadmapItem } from '../../Interface/roadmap';
import { NodeBase } from './NodeBase';

export const RightNode = (mode: NodeMode) => {
  const rightNode = (props: NodeProps<RoadmapItem>) => {
    return (
      <>
        <Handle type="target" position={Position.Left} />
        <NodeBase {...props} mode={mode} />
        <Handle type="source" position={Position.Right} id="right" />
        <Handle type="source" position={Position.Bottom} id="bottom" />
      </>
    );
  };
  return rightNode;
};
