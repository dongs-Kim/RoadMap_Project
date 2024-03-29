import { useCallback, useContext } from 'react';
import { ChatIcon, QuestionOutlineIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import shortUUID from 'short-uuid';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { addNode } from '../../../store/roadmapWriteSlice';
import { EditorContext } from '../contexts/EditorContext';
import { EN_ROADMAP_NODE_TYPE, RoadmapItem, RoadmapSetDto } from '../../../Interface/roadmap';
import { saveRoadmapAsync } from '../../../Apis/roadmapApi';
import { toastError, toastSuccess } from '../../../Utils/toast';
import { Node, useReactFlow } from 'reactflow';
import _ from 'lodash';
import { BsBoundingBoxCircles } from 'react-icons/bs';
import { MoveConfirmDialog } from './MoveConfirmDialog';
import { UsageModal } from './UsageModal';

export const Toolbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { nodes, edges, history, undoHistory, clipboard, ...roadmap } = useAppSelector((state) => state.roadmapWrite);
  const dispatch = useAppDispatch();
  const { editor, mode } = useContext(EditorContext);
  const navigate = useNavigate();
  const { project } = useReactFlow();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: isOpenUsage, onClose: onCloseUsage, onOpen: onOpenUsage } = useDisclosure();

  const getNumber = useCallback((value?: number | string): number | null => {
    if (!value) {
      return null;
    }
    if (_.isNumber(value)) {
      return value;
    }
    if (typeof value === 'string' && parseInt(value)) {
      return parseInt(value);
    }
    return null;
  }, []);

  const onClickAddSticker = useCallback(() => {
    const position = project({ x: 100, y: 100 });
    const maxZIndex = _.maxBy(nodes, (node) => node.zIndex ?? 0)?.zIndex ?? 0;

    const stickerNode: Node<RoadmapItem> = {
      id: shortUUID.generate(),
      type: 'stickerNode',
      data: { name: '', description: '', bgcolor: '#d9e3f0', border: true },
      position,
      zIndex: maxZIndex + 1,
    };
    dispatch(addNode(stickerNode));
  }, [dispatch, project, nodes]);

  const onClickAddRoadmapItem = useCallback(() => {
    const position = project({ x: 100, y: 100 });
    const maxZIndex = _.maxBy(nodes, (node) => node.zIndex ?? 0)?.zIndex ?? 0;

    const newNode: Node<RoadmapItem> = {
      id: shortUUID.generate(),
      position,
      type: EN_ROADMAP_NODE_TYPE.DownNode,
      data: { name: '', description: '', bgcolor: '#ffffff', border: true },
      zIndex: maxZIndex + 1,
    };
    dispatch(addNode(newNode));
  }, [dispatch, project, nodes]);

  const onMove = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const validateSave = useCallback((saveDto: RoadmapSetDto) => {
    if (!saveDto.roadmap.title) {
      toastError('제목을 입력해 주세요');
      return false;
    }
    if (!saveDto.roadmap.category) {
      toastError('카테고리를 선택해 주세요');
      return false;
    }
    return true;
  }, []);

  const onClickSave = useCallback(async () => {
    if (!editor) {
      return;
    }

    const saveNodes = nodes.map((node) => {
      const newNode: Node<RoadmapItem> = { ...node };
      newNode.width = getNumber(node.style?.width);
      newNode.height = getNumber(node.style?.height);
      return newNode;
    });

    const saveDto: RoadmapSetDto = {
      roadmap: {
        ...roadmap,
        contents: editor.getMarkdown(),
      },
      nodes: saveNodes,
      edges,
      mode: mode,
    };

    // 유효성 검사
    if (!validateSave(saveDto)) {
      return;
    }

    // 저장
    try {
      await saveRoadmapAsync(saveDto);
      toastSuccess('로드맵을 저장했습니다');
      navigate('/mypage');
    } catch {
      toastError('저장하지 못했습니다');
    }
  }, [nodes, edges, roadmap, editor, mode, navigate, getNumber, validateSave]);

  return (
    <Flex p="12px" justifyContent="space-between" alignItems="center" borderBottom="1px #ccc solid">
      <Box>
        <Button size="sm" variant="ghost" colorScheme="teal" onClick={onClickAddRoadmapItem}>
          <BsBoundingBoxCircles />
          <Text ml={2}>항목추가</Text>
        </Button>
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
        <Button size="sm" variant="ghost" colorScheme="teal" onClick={onOpenUsage}>
          <QuestionOutlineIcon />
          <Text ml={2}>사용법</Text>
        </Button>
      </Box>
      <Box>
        <Button colorScheme="teal" variant="ghost" mr={2} onClick={onOpen}>
          나가기
        </Button>
        <Button colorScheme="teal" mr={5} onClick={onClickSave}>
          저장
        </Button>
      </Box>

      <MoveConfirmDialog isOpen={isOpen} onClose={onClose} onMove={onMove} />
      <UsageModal isOpen={isOpenUsage} onClose={onCloseUsage} />
    </Flex>
  );
};
