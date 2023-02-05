import { useCallback, useContext } from 'react';
import { ChatIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import shortUUID from 'short-uuid';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { addNode } from '../../../store/roadmapWriteSlice';
import { EditorContext } from '../contexts/EditorContext';
import { RoadmapSetDto } from '../../../Interface/roadmap';
import { saveRoadmapAsync } from '../../../Apis/roadmapApi';
import { toastError, toastSuccess } from '../../../Utils/toast';

export const Toolbar = () => {
  const { nodes, edges, ...roadmap } = useAppSelector((state) => state.roadmapWrite);
  const dispatch = useAppDispatch();
  const { editor, mode } = useContext(EditorContext);
  const navigate = useNavigate();

  const onClickAddSticker = useCallback(() => {
    const stickerNode = {
      id: shortUUID.generate(),
      type: 'stickerNode',
      data: { name: '', description: '스티커', bgcolor: '#ffffff', border: true },
      position: { x: 0, y: 0 },
    };
    dispatch(addNode(stickerNode));
  }, [dispatch]);

  const onClickOut = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onClickSave = useCallback(async () => {
    if (!editor) {
      return;
    }

    const saveDto: RoadmapSetDto = {
      roadmap: {
        ...roadmap,
        contents: editor.getMarkdown(),
      },
      nodes,
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
          <Text ml={2}>스티커 추가</Text>
        </Button>
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