import { Handle, NodeProps, Position } from 'reactflow';
import { RoadmapNodeData } from '../../Interface/roadmap';

export const StartNode = ({ data }: NodeProps<RoadmapNodeData>) => {
  return (
    <>
      {data.label}
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </>
  );
};
