import { CSSProperties, useMemo } from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';
import { EdgeData } from '../../Interface/roadmap';

export const RoadmapEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  data,
}: EdgeProps<EdgeData>) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const style = useMemo(() => {
    const result: CSSProperties = {
      stroke: data?.color ?? '#2b78e4',
      strokeWidth: '3',
      fill: 'none',
    };
    if (data?.lineType === 'dash') {
      result.strokeWidth = '4';
      result.strokeDasharray = '0.8 12';
      result.strokeLinecap = 'round';
      result.strokeLinejoin = 'round';
    }
    if (selected) {
      result.filter = 'brightness(0.7)';
    }
    return result;
  }, [data, selected]);

  return (
    <>
      <g cursor="pointer">
        <path id={id} style={style} d={edgePath} />
        <path id={id} style={{ strokeWidth: '20', fill: 'none' }} d={edgePath} />
      </g>
    </>
  );
};
