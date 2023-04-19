import { Badge, Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../Components/Page/Loading';
import { useUser } from '../../Hooks/dataFetch/useUser';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { useTitle } from '../../Hooks/useTitle';
import { useViewer } from '../../Hooks/useViewer';
import {
  clearLearnResourceReplies,
  clearLike,
  clearState,
  getIsLike,
  getLearnResourceReplies,
  getLearnResourceView,
} from '../../store/learnResourceViewSlice';
import { HeaderToolbar } from './components/HeaderToolbar';
import { ImLink } from 'react-icons/im';
import { getUrl } from '../../Utils/url';
import { LearnResourceReply } from './components/LearnResourceReply';

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
    if (id) {
      dispatch(getLearnResourceReplies({ id }));
    } else {
      dispatch(clearLearnResourceReplies());
    }

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
          {!_.isEmpty(learnResource?.url) && (
            <Flex mb={5} flexDir="column" gap={2}>
              {learnResource?.url?.map((url) => (
                <Flex key={url}>
                  <Link color="teal" fontSize="11pt" href={getUrl(url)} target="_blank">
                    <Flex alignItems="center">
                      <ImLink style={{ display: 'inline-block', marginRight: '5px', color: '#888' }} />
                      <Text>{url}</Text>
                    </Flex>
                  </Link>
                </Flex>
              ))}
            </Flex>
          )}

          {/* 설명 */}
          <Flex mb={20} mt={5}>
            <Box ref={viewerElRef}></Box>
          </Flex>
        </Flex>

        {/* 댓글 */}
        <Flex flexDir="column" width={{ base: '100%', lg: '1000px' }} pt={10} p={3}>
          <LearnResourceReply learn_resource_id={id} setLoading={setLoading} />
        </Flex>
      </Flex>
    </>
  );
};
