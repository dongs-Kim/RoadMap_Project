import { Box, Flex } from '@chakra-ui/react';
import { NodeProps } from 'reactflow';
import { ImLink } from 'react-icons/im';
import { RoadmapItem } from '../../Interface/roadmap';
import { NodeResizer } from '@reactflow/node-resizer';

export const StickerNode = (props: NodeProps<RoadmapItem>) => {
  if (props.data.url) {
    let url = props.data.url;
    if (!url.match(/https?:\/\//i)) {
      url = `//${props.data.url}`;
    }
    return (
      // <a href={url} target="_blank" rel="noreferrer">
      <StickerBox nodeProps={props}>
        <ImLink style={{ display: 'inline-block', marginRight: '5px' }} />
      </StickerBox>
      // </a>
    );
  }
  return <StickerBox nodeProps={props} />;
};

const StickerBox = ({ nodeProps, children }: { nodeProps: NodeProps<RoadmapItem>; children?: React.ReactNode }) => {
  const { data, selected } = nodeProps;
  return (
    <>
      <NodeResizer color="#fff" isVisible={selected} minWidth={100} minHeight={42} />
      <Flex
        bg={data.bgcolor ?? '#ffeb3b'}
        p={5}
        h="100%"
        borderWidth={data.border ? '1.5px' : ''}
        borderStyle="solid"
        borderColor="black"
        fontSize="0.9rem"
        whiteSpace="pre-line"
        justifyContent="center"
        alignItems="center"
      >
        {children}
        {data.description ? data.description : <Box color="gray.400">내용을 입력하세요</Box>}
      </Flex>
    </>
  );
};
