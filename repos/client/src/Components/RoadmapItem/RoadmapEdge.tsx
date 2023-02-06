import { CSSProperties } from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

export const RoadmapEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  selected,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const style: CSSProperties = {
    stroke: '#2b78e4',
    strokeWidth: '4',
    fill: 'none',
    strokeDasharray: '0.8 12',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (selected) {
    style.filter = 'brightness(0.5)';
  }

  return (
    <>
      <path id={id} style={style} d={edgePath} markerEnd={markerEnd} />
    </>
  );
};
