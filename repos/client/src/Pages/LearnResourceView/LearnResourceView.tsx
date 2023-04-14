import { Badge, Box, Button, Flex, Heading, Link, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { Loading } from '../../Components/Page/Loading';
import { useUser } from '../../Hooks/dataFetch/useUser';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { useTitle } from '../../Hooks/useTitle';
import { useViewer } from '../../Hooks/useViewer';
import { clearLike, clearState, getIsLike, getLearnResourceView, toggleLike } from '../../store/learnResourceViewSlice';
import { LoginDialog } from '../../Components/Dialog/LoginDialog';
import { likeLearnResourceAsync, unlikeLearnResourceAsync } from '../../Apis/learnResourceApi';
import { HeaderToolbar } from './components/HeaderToolbar';
import { ImLink } from 'react-icons/im';
import { getUrl } from '../../Utils/url';

export const LearnResourceView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { isLogined } = useUser();
  const learnResource = useAppSelector((state) => state.learnResourceView.learnResource);
  const viewerElRef = useRef<HTMLDivElement | null>(null);

  useViewer(viewerElRef, learnResource?.contents);
  useTitle(`${learnResource?.name ?? ''} - Dev Roadmap`);

  const initLearnResource = useCallback(async () => {
    if (id) {
      await dispatch(getLearnResourceView({ id: id }));
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [dispatch, id]);

  // 리소스 데이터 조회
  useEffect(() => {
    initLearnResource();
  }, [initLearnResource]);

  // 데이터 조회
  useEffect(() => {
    if (isLogined && id) {
      dispatch(getIsLike({ id }));
    } else {
      dispatch(clearLike());
    }
  }, [isLogined, id, dispatch]);

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
              <Badge colorScheme="messenger" mr={3}>
                학습 리소스
              </Badge>
              <Badge colorScheme="green">{learnResource?.category}</Badge>
            </Link>
          </Flex>

          {/* 제목 */}
          <Flex pb={5}>
            <Heading size="xl">{learnResource?.name}</Heading>
          </Flex>

          {/* 툴바 */}
          <HeaderToolbar />

          {/* url */}
          {learnResource?.url && (
            <Flex mb={5}>
              <Link color="teal" fontSize="11pt" href={getUrl(learnResource?.url)} target="_blank">
                <Flex alignItems="center">
                  <ImLink style={{ display: 'inline-block', marginRight: '5px', color: '#888' }} />
                  <Text> {learnResource?.url}</Text>
                </Flex>
              </Link>
            </Flex>
          )}

          {/* 설명 */}
          <Flex mb={5}>
            <Box ref={viewerElRef}></Box>
          </Flex>
        </Flex>

        {/* 댓글 */}
        {/* <Flex flexDir="column" width={{ base: '100%', lg: '1000px' }} pt={10} p={3}>
          <RoadmapReply roadmap_id={roadmapId} setLoading={setLoading} />
        </Flex> */}
      </Flex>
    </>
  );
};
