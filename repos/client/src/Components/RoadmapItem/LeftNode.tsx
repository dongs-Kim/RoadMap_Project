import { Handle, NodeProps, Position } from 'reactflow';
import { RoadmapItem } from '../../Interface/roadmap';

export const LeftNode = ({ data }: NodeProps<RoadmapItem>) => {
  return (
    <>
      <Handle type="target" position={Position.Right} />
      {data.name}
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </>
  );
};
