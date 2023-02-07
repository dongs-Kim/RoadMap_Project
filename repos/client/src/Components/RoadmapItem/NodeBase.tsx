import { Box, Flex } from '@chakra-ui/react';
import { NodeProps } from 'reactflow';
import { BsCheckLg } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import { RoadmapItemStatus } from '../../Constants/roadmapItemStatus';
import { RoadmapItem } from '../../Interface/roadmap';
import { NodeResizer } from '@reactflow/node-resizer';

export const NodeBase = ({ data, selected }: NodeProps<RoadmapItem>) => {
  return (
    <>
      <NodeResizer color="#fff" isVisible={selected} minWidth={100} minHeight={42} />
      <Flex
        bg={data.bgcolor}
        p="12px"
        h="100%"
        borderWidth={data.border ? '1.5px' : ''}
        borderStyle="solid"
        borderColor="black"
        borderRadius="5px"
        filter={selected ? 'brightness(0.95)' : ''}
        fontSize="0.9rem"
        letterSpacing="1px"
        justifyContent="center"
        alignItems="center"
      >
        {data.name ? data.name : <Box color="gray.400">항목명</Box>}
        <StatusIcon status={data.status} />
      </Flex>
    </>
  );
};

const StatusIcon = ({ status }: { status?: RoadmapItemStatus }) => {
  if (status === 'todo') {
    return (
      <Box position="absolute" top="-9px" right="-3px" color="#888" fontSize="lg">
        <FiClock />
      </Box>
    );
  } else if (status === 'ing') {
    return (
      <Box position="absolute" top="-9px" right="-3px" color="#ff9800" fontSize="sm">
        <FaPlay />
      </Box>
    );
  } else if (status === 'completed') {
    return (
      <Box position="absolute" top="-9px" right="-3px" color="#4caf50" fontSize="lg">
        <BsCheckLg />
      </Box>
    );
  }
  return null;
};
