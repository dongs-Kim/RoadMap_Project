import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export function RoadmapItemNode({ data }: any) {
  return (
    <div
      style={{
        height: '50px',
        border: '1px solid #eee',
        padding: '5px',
        borderRadius: '5px',
        background: 'white',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </div>
  );
}
