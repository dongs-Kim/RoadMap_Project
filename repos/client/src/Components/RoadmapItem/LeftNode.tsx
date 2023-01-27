import { Handle, NodeProps, Position } from 'reactflow';
import { RoadmapNodeData } from '../../Interface/roadmap';

export const LeftNode = ({ data }: NodeProps<RoadmapNodeData>) => {
  return (
    <>
      <Handle type="target" position={Position.Right} />
      {data.label}
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </>
  );
};
