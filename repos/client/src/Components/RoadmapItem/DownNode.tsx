import { Box } from '@chakra-ui/react';
import { Handle, NodeProps, Position } from 'reactflow';
import { RoadmapItem } from '../../Interface/roadmap';

export const DownNode = ({ data, selected }: NodeProps<RoadmapItem>) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Box
        bg={data.bgcolor}
        p="10px"
        borderWidth="1px"
        borderStyle="solid"
        borderColor={data.border ? 'black' : ''}
        borderRadius="3px"
        filter={selected ? 'brightness(0.8)' : ''}
      >
        {data.name}
      </Box>
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </>
  );
};
