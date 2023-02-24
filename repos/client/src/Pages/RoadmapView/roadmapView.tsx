import { Badge, Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useViewer } from '../../Hooks/useViewer';
import { FlowView } from './components/FlowView';
import { RoadmapReply } from './components/RoadmapReply';
import { HeaderToolbar } from './components/HeaderToolbar';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import {
  clearBookmark,
  clearLike,
  clearReplies,
  clearState,
  getIsBookmark,
  getIsLike,
  getReplies,
  getRoadmapView,
} from '../../store/roadmapViewSlice';
import { Loading } from '../../Components/Page/Loading';
import { getRoadmapCategoryName } from '../../Constants/roadmap';
import { useUser } from '../../Hooks/dataFetch/useUser';
import { useTitle } from '../../Hooks/useTitle';

const RoadmapView = () => {
  const { roadmapId } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { userData, isLogined } = useUser();
  const roadmapSet = useAppSelector((state) => state.roadmapView.roadmapSet);
  const viewerElRef = useRef<HTMLDivElement | null>(null);
  useViewer(viewerElRef, roadmapSet?.roadmap?.contents);
  useTitle(`${roadmapSet?.roadmap.title ?? ''} - Dev Roadmap`);

  const initRoadmap = useCallback(async () => {
    if (roadmapId) {
      await dispatch(getRoadmapView({ id: roadmapId }));
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [dispatch, roadmapId]);

  // 로드맵 데이터 조회
  useEffect(() => {
    initRoadmap();
  }, [initRoadmap]);

  // 데이터 조회
  useEffect(() => {
    if (roadmapId) {
      dispatch(getReplies({ id: roadmapId }));
    } else {
      dispatch(clearReplies());
    }

    if (isLogined && roadmapId) {
      dispatch(getIsBookmark({ id: roadmapId }));
      dispatch(getIsLike({ id: roadmapId }));
    } else {
      dispatch(clearBookmark());
      dispatch(clearLike());
    }
  }, [isLogined, roadmapId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  return (
    <>
      {/* 로딩 */}
      <Loading isOpen={loading} />

      <Flex width="100%" alignItems="center" flexDir="column" bg="#fff" pb={20} pt={10}>
        <Flex flexDir="column" width={{ base: '100%', lg: '1000px' }} pt={10} p={3}>
          {/* 카테고리 */}
          <Flex pb={3}>
            <Link>
              <Badge colorScheme="green">
                {roadmapSet?.roadmap && getRoadmapCategoryName(roadmapSet?.roadmap.category)}
              </Badge>
            </Link>
          </Flex>

          {/* 제목 */}
          <Flex pb={5}>
            <Heading size="xl">{roadmapSet?.roadmap?.title}</Heading>
          </Flex>

          {/* 툴바 */}
          <HeaderToolbar />

          {/* 썸네일 */}
          {roadmapSet?.roadmap?.thumbnail && (
            <Flex mt={10} mb={10} justifyContent="center">
              <Image src={roadmapSet?.roadmap.thumbnail} w="100%" maxW="500px" />
            </Flex>
          )}

          {/* 설명 */}
          <Flex mb={5}>
            <Box ref={viewerElRef}></Box>
          </Flex>
        </Flex>

        {/* 로드맵 */}
        <Flex mb={10} w="100%" bg="#f4f5f6" borderTop="1px solid #ddd" borderBottom="1px solid #ddd">
          {roadmapSet?.nodes && roadmapSet?.edges && <FlowView nodes={roadmapSet.nodes} edges={roadmapSet.edges} />}
        </Flex>

        {/* 댓글 */}
        <Flex flexDir="column" width={{ base: '100%', lg: '1000px' }} pt={10} p={3}>
          <RoadmapReply roadmap_id={roadmapId} setLoading={setLoading} />
        </Flex>
      </Flex>
    </>
  );
};

export default RoadmapView;
