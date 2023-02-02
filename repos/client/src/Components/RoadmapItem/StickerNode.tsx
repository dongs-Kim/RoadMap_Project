import { NodeProps } from 'reactflow';
import { RoadmapItem } from '../../Interface/roadmap';

export const StickerNode = ({ data }: NodeProps<RoadmapItem>) => {
  return (
    <>
      <div style={{ padding: '15px', background: '#ffeb3b', fontSize: '12px' }}>
        <pre>{data.description}</pre>
      </div>
    </>
  );
};
