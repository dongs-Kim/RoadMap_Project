import { useCallback, useContext } from 'react';
import { ChatIcon, QuestionOutlineIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import shortUUID from 'short-uuid';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { addNode } from '../../../store/roadmapWriteSlice';
import { EditorContext } from '../contexts/EditorContext';
import { RoadmapItem, RoadmapSetDto } from '../../../Interface/roadmap';
import { saveRoadmapAsync } from '../../../Apis/roadmapApi';
import { toastError, toastSuccess } from '../../../Utils/toast';
import { Node, useReactFlow } from 'reactflow';

export const Toolbar = () => {
  const { nodes, edges, ...roadmap } = useAppSelector((state) => state.roadmapWrite);
  const dispatch = useAppDispatch();
  const { editor, mode } = useContext(EditorContext);
  const navigate = useNavigate();
  const { project } = useReactFlow();

  const onClickAddSticker = useCallback(() => {
    const position = project({ x: 100, y: 100 });
    const stickerNode = {
      id: shortUUID.generate(),
      type: 'stickerNode',
      data: { name: '', description: '', bgcolor: '#d9e3f0', border: true },
      position,
    };
    dispatch(addNode(stickerNode));
  }, [dispatch, project]);

  const onClickOut = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onClickSave = useCallback(async () => {
    if (!editor) {
      return;
    }

    const saveNodes = nodes.map((node) => {
      const newNode: Node<RoadmapItem> = { ...node, width: null, height: null };
      if (node.style?.width && typeof node.style.width === 'string' && parseInt(node.style.width)) {
        newNode.width = parseInt(node.style.width);
      }
      if (node.style?.height && typeof node.style.height === 'string' && parseInt(node.style.height)) {
        newNode.height = parseInt(node.style.height);
      }
      return newNode;
    });

    const saveDto: RoadmapSetDto = {
      roadmap: {
        ...roadmap,
        contents: editor.getMarkdown(),
      },
      nodes: saveNodes,
      edges,
      isUpdate: mode === 'modify',
    };

    try {
      await saveRoadmapAsync(saveDto);
      toastSuccess('로드맵을 저장했습니다');
      navigate('/mypage');
    } catch {
      toastError('저장하지 못했습니다');
    }
  }, [nodes, edges, roadmap, editor, mode, navigate]);

  return (
    <Flex p="12px" justifyContent="space-between" alignItems="center" borderBottom="1px #ccc solid">
      <Box>
        <Button size="sm" variant="ghost" colorScheme="teal" onClick={onClickAddSticker}>
          <ChatIcon />
          <Text ml={2}>스티커</Text>
        </Button>
        <a href="https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md" target="_blank" rel="noreferrer">
          <Button size="sm" variant="ghost" colorScheme="teal">
            <SearchIcon />
            <Text ml={2}>이모지</Text>
          </Button>
        </a>
        <Button size="sm" variant="ghost" colorScheme="teal">
          <QuestionOutlineIcon />
          <Text ml={2}>사용법</Text>
        </Button>
      </Box>
      <Box>
        <Button colorScheme="teal" variant="ghost" mr={2} onClick={onClickOut}>
          나가기
        </Button>
        <Button colorScheme="teal" mr={5} onClick={onClickSave}>
          저장
        </Button>
      </Box>
    </Flex>
  );
};
