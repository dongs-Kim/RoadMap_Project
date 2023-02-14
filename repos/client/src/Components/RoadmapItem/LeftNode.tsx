import { Handle, NodeProps, Position } from 'reactflow';
import { NodeMode, RoadmapItem } from '../../Interface/roadmap';
import { NodeBase } from './NodeBase';

export const LeftNode = (mode: NodeMode) => {
  const leftNode = (props: NodeProps<RoadmapItem>) => {
    return (
      <>
        <Handle type="target" position={Position.Right} />
        <NodeBase {...props} mode={mode} />
        <Handle type="source" position={Position.Left} id="left" />
        <Handle type="source" position={Position.Bottom} id="bottom" />
      </>
    );
  };
  return leftNode;
};
