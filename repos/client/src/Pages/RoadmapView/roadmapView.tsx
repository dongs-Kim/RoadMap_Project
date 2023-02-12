import { Badge, Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useViewer } from '../../Hooks/useViewer';
import { FlowView } from './components/FlowView';
import { RoadmapReply } from './components/RoadmapReply';
import { HeaderToolbar } from './components/HeaderToolbar';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { getIsStore, getRoadmapView } from '../../store/roadmapViewSlice';
import { Loading } from '../../Components/Page/Loading';
import { getRoadmapCategoryName } from '../../Constants/roadmap';

const RoadmapView = () => {
  const { roadmapId } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const roadmapSet = useAppSelector((state) => state.roadmapView.roadmapSet);
  const viewerElRef = useRef<HTMLDivElement | null>(null);
  useViewer(viewerElRef, roadmapSet?.roadmap?.contents);

  const initRoadmap = useCallback(async () => {
    if (roadmapId) {
      await dispatch(getRoadmapView({ id: roadmapId }));

      dispatch(getIsStore({ id: roadmapId }));
    }
    setLoading(false);
  }, [dispatch, roadmapId]);

  // 데이터 조회
  useEffect(() => {
    initRoadmap();
  }, [initRoadmap]);

  return (
    <>
      {/* 로딩 */}
      <Loading isOpen={loading} />

      <Flex width="100%" justifyContent="center">
        <Flex flexDir="column" width={{ base: '100%', md: '1000px' }} minH="500px" pt={10}>
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
            <Flex justifyContent="center">
              <Image src={roadmapSet?.roadmap.thumbnail} w="100%" maxW="800px" />
            </Flex>
          )}

          {/* 설명 */}
          <Flex mb={5}>
            <Box ref={viewerElRef}></Box>
          </Flex>

          {/* 로드맵 */}
          <Flex mb={10}>
            {roadmapSet?.nodes && roadmapSet?.edges && (
              <FlowView
                nodes={roadmapSet.nodes}
                edges={roadmapSet.edges}
                openModal={() => {
                  //
                }}
              />
            )}
          </Flex>

          {/* 댓글 */}
          <RoadmapReply
            replies={[
              {
                id: '1',
                contents: '감사합니다 :)\n도움이 되었습니다!',
                user_id: 'aaa',
                user_nickname: '호호',
                created_at: '',
              },
              {
                id: '2',
                contents: '감사합니다 :)',
                user_id: 'aaa',
                user_nickname: '호호',
                created_at: '',
              },
            ]}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default RoadmapView;
