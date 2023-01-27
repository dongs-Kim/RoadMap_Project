import { Handle, NodeProps, Position } from 'reactflow';
import { RoadmapNodeData } from '../../Interface/roadmap';

export const RightNode = ({ data }: NodeProps<RoadmapNodeData>) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      {data.label}
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </>
  );
};
