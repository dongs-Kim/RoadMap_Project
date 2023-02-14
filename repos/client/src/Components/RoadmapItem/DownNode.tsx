import { Handle, NodeProps, Position } from 'reactflow';
import { NodeMode, RoadmapItem } from '../../Interface/roadmap';
import { NodeBase } from './NodeBase';

export const DownNode = (mode: NodeMode) => {
  const downNode = (props: NodeProps<RoadmapItem>) => {
    return (
      <>
        <Handle type="target" position={Position.Top} />
        <NodeBase {...props} mode={mode} />
        <Handle type="source" position={Position.Left} id="left" />
        <Handle type="source" position={Position.Right} id="right" />
        <Handle type="source" position={Position.Bottom} id="bottom"></Handle>
      </>
    );
  };
  return downNode;
};
