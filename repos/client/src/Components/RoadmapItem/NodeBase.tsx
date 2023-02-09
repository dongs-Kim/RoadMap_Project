import { Box, Flex } from '@chakra-ui/react';
import { NodeProps } from 'reactflow';
import { BsCheckLg, BsCheckCircleFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import { RoadmapItemRequired, RoadmapItemStatus } from '../../Constants/roadmapItem';
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
        fontSize="0.9rem"
        letterSpacing="1px"
        justifyContent="center"
        alignItems="center"
      >
        {data.name ? data.name : <Box color="gray.400">항목명</Box>}
        <RequiredIcon required={data.required} />
        <StatusIcon status={data.status} />
      </Flex>
    </>
  );
};

const StatusIcon = ({ status }: { status?: RoadmapItemStatus }) => {
  if (status === 'todo') {
    return (
      <Box position="absolute" top="-11px" right="-3px" color="#888" fontSize="xl">
        <FiClock />
      </Box>
    );
  } else if (status === 'ing') {
    return (
      <Box position="absolute" top="-9px" right="-3px" color="#ff9800" fontSize="md">
        <FaPlay />
      </Box>
    );
  } else if (status === 'completed') {
    return (
      <Box position="absolute" top="-11px" right="-3px" color="#4caf50" fontSize="lg">
        <BsCheckLg />
      </Box>
    );
  }
  return null;
};

const RequiredIcon = ({ required }: { required?: RoadmapItemRequired }) => {
  if (required === 'required') {
    return (
      <Box position="absolute" top="-10px" left="-9px" color="purple.500" fontSize="lg">
        <BsCheckCircleFill />
      </Box>
    );
  } else if (required === 'optional') {
    return (
      <Box position="absolute" top="-10px" left="-9px" color="gray.500" fontSize="lg">
        <BsCheckCircleFill />
      </Box>
    );
  }
  return null;
};
