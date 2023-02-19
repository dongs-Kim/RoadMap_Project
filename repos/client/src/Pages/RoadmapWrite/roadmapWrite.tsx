import { useState, useMemo, useEffect, useCallback } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { LeftPanel } from './components/LeftPanel';
import { Toolbar } from './components/Toolbar';
import { Roadmap } from './components/Roadmap';
import Editor from '@toast-ui/editor';
import { EditorContext } from './contexts/EditorContext';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { clearRoadmap, getRoadmap, setRoadmap } from '../../store/roadmapWriteSlice';
import { Loading } from '../../Components/Page/Loading';
import { useTitle } from '../../Hooks/useTitle';

const RoadmapWrite = () => {
  useTitle('로드맵 작성 - Dev Roadmap');
  const { roadmapId } = useParams();
  const location = useLocation();
  const [editor, setEditor] = useState<Editor | null>(null);
  const dispatch = useAppDispatch();
  const roadmap = useAppSelector((state) => state.roadmapWrite);
  const [loading, setLoading] = useState(true);

  const initRoadmap = useCallback(async () => {
    if (location.state) {
      // 복사
      await dispatch(setRoadmap(location.state));
    } else if (roadmapId) {
      // 수정
      await dispatch(getRoadmap({ id: roadmapId }));
    } else {
      // 신규
      await dispatch(clearRoadmap());
    }
    setLoading(false);
  }, [dispatch, roadmapId, location.state]);

  // 데이터 조회
  useEffect(() => {
    initRoadmap();
  }, [initRoadmap]);

  // 에디터에 초기값 설정
  useEffect(() => {
    if (editor && !loading) {
      editor.setMarkdown(roadmap.contents);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, editor]);

  const mode = useMemo(() => {
    if (roadmapId) {
      return 'modify';
    } else if (location.state) {
      return 'copy';
    }
    return 'new';
  }, [roadmapId, location.state]);

  return (
    // 에디터 객체는 직렬화가 불가능하여 redux를 사용하지 못하고 context를 사용하여 공유한다
    <EditorContext.Provider value={{ editor, setEditor, roadmapId, mode }}>
      {/* 로딩 */}
      <Loading isOpen={loading} />

      <Box>
        <Flex minHeight="100vh" overflow="auto">
          {/* 좌측 패널 */}
          <LeftPanel />

          {/* 우측 패널 */}
          <Box flex="1">
            {/* 툴바 */}
            <Toolbar />

            {/* 로드맵 */}
            <Roadmap />
          </Box>
        </Flex>
      </Box>
    </EditorContext.Provider>
  );
};

export default RoadmapWrite;
