import { Box, Heading } from '@chakra-ui/react';
import { Handle, NodeProps, Position } from 'reactflow';
import { RoadmapItem } from '../../Interface/roadmap';

export const StartNode = ({ data }: NodeProps<RoadmapItem>) => {
  return (
    <>
      <Box p={3}>
        <Heading size="lg" fontFamily="'Mochiy Pop One', 'Gamja Flower', sans-serif">
          {data.name}
        </Heading>
      </Box>
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </>
  );
};
