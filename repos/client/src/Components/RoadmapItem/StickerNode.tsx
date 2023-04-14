import { Box, Flex } from '@chakra-ui/react';
import { NodeProps } from 'reactflow';
import { ImLink } from 'react-icons/im';
import { NodeMode, RoadmapItem } from '../../Interface/roadmap';
import { NodeResizer } from '@reactflow/node-resizer';
import { getUrl } from '../../Utils/url';

export const StickerNode = (mode: NodeMode) => {
  const stickerNode = (props: NodeProps<RoadmapItem>) => {
    if (props.data.url) {
      const url = getUrl(props.data.url);
      const component = (
        <StickerBox nodeProps={props} mode={mode}>
          <ImLink style={{ display: 'inline-block', marginRight: '5px' }} />
        </StickerBox>
      );

      if (mode === 'view') {
        return (
          <a href={url} target="_blank" rel="noreferrer">
            {component}
          </a>
        );
      }
      return component;
    }
    return <StickerBox nodeProps={props} mode={mode} />;
  };
  return stickerNode;
};

const StickerBox = ({
  nodeProps,
  children,
  mode,
}: {
  nodeProps: NodeProps<RoadmapItem>;
  children?: React.ReactNode;
  mode: NodeMode;
}) => {
  const { data, selected } = nodeProps;
  return (
    <>
      <NodeResizer color="#fff" isVisible={selected} minWidth={100} minHeight={42} />
      <Flex
        bg={data.bgcolor ?? '#ffeb3b'}
        p={5}
        h="100%"
        borderWidth={data.border ? '2px' : ''}
        borderStyle="solid"
        borderColor="black"
        fontSize="0.9rem"
        whiteSpace="pre-line"
        justifyContent="center"
        alignItems="center"
      >
        {children}
        {!data.description && mode === 'write' ? <Box color="gray.400">내용을 입력하세요</Box> : data.description}
      </Flex>
    </>
  );
};
