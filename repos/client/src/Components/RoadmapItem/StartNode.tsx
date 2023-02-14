import { Box, Center, Heading } from '@chakra-ui/react';
import { NodeResizer } from '@reactflow/node-resizer';
import { Handle, NodeProps, Position } from 'reactflow';
import { NodeMode, RoadmapItem } from '../../Interface/roadmap';

export const StartNode = (mode: NodeMode) => {
  const startNode = ({ data, selected }: NodeProps<RoadmapItem>) => {
    return (
      <>
        <NodeResizer color="#fff" isVisible={selected} minWidth={100} minHeight={42} />
        <Center p={3} h="100%">
          <Heading size="lg" fontFamily="'Gamja Flower', sans-serif">
            {!data.name && mode === 'write' ? <Box color="gray.400">항목명</Box> : data.name}
          </Heading>
        </Center>
        <Handle type="source" position={Position.Bottom} id="bottom" />
      </>
    );
  };
  return startNode;
};
