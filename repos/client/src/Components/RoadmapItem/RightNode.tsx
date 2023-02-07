import { Handle, NodeProps, Position } from 'reactflow';
import { RoadmapItem } from '../../Interface/roadmap';
import { NodeBase } from './NodeBase';

export const RightNode = (props: NodeProps<RoadmapItem>) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <NodeBase {...props} />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </>
  );
};
