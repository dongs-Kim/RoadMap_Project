import { Handle, NodeProps, Position } from 'reactflow';
import { RoadmapNodeData } from '../../Interface/roadmap';

export const DownNode = ({ data }: NodeProps<RoadmapNodeData>) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      {data.label}
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </>
  );
};
