import { Handle, NodeProps, Position } from 'reactflow';
import { RoadmapItem } from '../../Interface/roadmap';

export const RightNode = ({ data }: NodeProps<RoadmapItem>) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      {data.name}
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </>
  );
};
