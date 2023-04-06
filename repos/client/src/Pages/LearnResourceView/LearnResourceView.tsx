import { Button, Flex, Heading, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
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

export const LearnResourceView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { isLogined } = useUser();
  const learnResource = useAppSelector((state) => state.learnResource.learnResource);
  const isLike = useAppSelector((state) => state.learnResource.isLike);
  const viewerElRef = useRef<HTMLDivElement | null>(null);
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClickLike = useCallback(
    _.throttle(() => {
      if (!learnResource?.id) {
        return;
      }
      if (!isLogined) {
        onOpenLogin();
        return;
      }

      if (isLike) {
        unlikeLearnResourceAsync(learnResource.id);
      } else {
        likeLearnResourceAsync(learnResource.id);
      }
      dispatch(toggleLike());
    }, 200),
    [dispatch, learnResource, isLogined, isLike, onOpenLogin],
  );

  return (
    <>
      {/* 로딩 */}
      <Loading isOpen={loading} />

      <Flex flexDir="column">
        <Heading size="xl">{learnResource?.name}</Heading>

        <div>url</div>
        <div>{learnResource?.url}</div>

        <div>카테고리</div>
        <div>{learnResource?.category}</div>

        <div>좋아요</div>
        <div>{learnResource?.like}</div>

        <div>작성자</div>
        <div>{learnResource?.user_nickname}</div>

        <div>작성일</div>
        <div>{learnResource?.created_at}</div>

        {/* 좋아요 */}
        <Tooltip label="좋아요">
          <Button leftIcon={<AiFillHeart />} colorScheme={isLike ? 'red' : 'gray'} ml={3} onClick={onClickLike}>
            <Text>{learnResource?.like ?? 0}</Text>
          </Button>
        </Tooltip>

        <div>내용</div>
        <div ref={viewerElRef}></div>
      </Flex>

      <LoginDialog isOpen={isOpenLogin} onClose={onCloseLogin} />
    </>
  );
};
