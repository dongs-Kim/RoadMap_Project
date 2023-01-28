import { Handle, NodeProps, Position } from 'reactflow';
import { RoadmapItem } from '../../Interface/roadmap';

export const StartNode = ({ data }: NodeProps<RoadmapItem>) => {
  return (
    <>
      {data.name}
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </>
  );
};
