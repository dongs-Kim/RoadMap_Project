/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { AiFillHeart } from 'react-icons/ai';
import { BiImageAlt } from 'react-icons/bi';
import { BsBookmark, BsDownload, BsFacebook, BsFillBookmarkFill, BsShare, BsTwitter } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { IoCopyOutline } from 'react-icons/io5';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { useCallback } from 'react';
import _ from 'lodash';
import { toPng } from 'html-to-image';
import { downloadImage } from '../../../Utils/roadmap';
import { RoadmapSetDto } from '../../../Interface/roadmap';
import { useNavigate } from 'react-router-dom';
import { CloneConfirmDialog } from './CloneConfirmDialog';
import { toggleBookmark, toggleLike } from '../../../store/roadmapViewSlice';
import { toastSuccess } from '../../../Utils/toast';
import {
  bookmarkRoadmapAsync,
  likeRoadmapAsync,
  unbookmarkRoadmapAsync,
  unlikeRoadmapAsync,
} from '../../../Apis/roadmapApi';
import { useUser } from '../../../Hooks/dataFetch/useUser';
import { LoginDialog } from '../../../Components/Dialog/LoginDialog';

export const HeaderToolbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const roadmapSet = useAppSelector((state) => state.roadmapView.roadmapSet);
  const isBookmark = useAppSelector((state) => state.roadmapView.isStore);
  const isLike = useAppSelector((state) => state.roadmapView.isLike);
  const { isOpen: isOpenCopy, onOpen: onOpenCopy, onClose: onCloseCopy } = useDisclosure();
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isLogined } = useUser();

  const onClickDownloadImage = useCallback(
    _.throttle(async () => {
      const flowEl = document.querySelector<HTMLElement>('.react-flow');
      if (!flowEl) {
        return;
      }
      const result = await toPng(flowEl, {
        filter: (node) => {
          if (node?.classList?.contains('react-flow__minimap') || node?.classList?.contains('react-flow__controls')) {
            return false;
          }
          return true;
        },
      });
      downloadImage(result);
    }, 200),
    [],
  );

  const onClickCopy = useCallback(() => {
    if (isLogined) {
      onOpenCopy();
    } else {
      onOpenLogin();
    }
  }, []);

  const onCopyRoadmap = useCallback(
    _.throttle(async () => {
      if (!roadmapSet) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...restRoadmap } = roadmapSet.roadmap;
      const cloneRoadmapSet: RoadmapSetDto = {
        ...roadmapSet,
        roadmap: restRoadmap,
      };
      navigate('/Roadmap/write', {
        state: cloneRoadmapSet,
      });
    }, 200),
    [roadmapSet, navigate],
  );

  const onClickBookmark = useCallback(
    _.throttle(() => {
      if (!roadmapSet?.roadmap.id) {
        return;
      }
      if (!isLogined) {
        onOpenLogin();
        return;
      }

      if (isBookmark) {
        unbookmarkRoadmapAsync(roadmapSet.roadmap.id);
      } else {
        bookmarkRoadmapAsync(roadmapSet.roadmap.id);
      }
      dispatch(toggleBookmark());
      if (!isBookmark) {
        toastSuccess('북마크에 추가했습니다');
      }
    }, 200),
    [dispatch, roadmapSet, isLogined, isBookmark, onOpenLogin],
  );

  const onClickLike = useCallback(
    _.throttle(() => {
      if (!roadmapSet?.roadmap.id) {
        return;
      }
      if (!isLogined) {
        onOpenLogin();
        return;
      }

      if (isLike) {
        unlikeRoadmapAsync(roadmapSet.roadmap.id);
      } else {
        likeRoadmapAsync(roadmapSet.roadmap.id);
      }
      dispatch(toggleLike());
    }, 200),
    [dispatch, roadmapSet, isLogined, isLike, onOpenLogin],
  );

  const onClickShareCopyURL = useCallback(
    _.throttle(() => {
      navigator.clipboard.writeText(window.location.href);
      toastSuccess('URL이 복사되었습니다');
    }, 200),
    [],
  );

  const onClickShareFacebook = useCallback(
    _.throttle(() => {
      window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURI(window.location.href)}`);
    }, 200),
    [],
  );

  const onClickShareTwitter = useCallback(
    _.throttle(() => {
      if (roadmapSet) {
        window.open(
          `https://twitter.com/intent/tweet?text=${roadmapSet.roadmap.title}&url=${encodeURI(window.location.href)}`,
        );
      }
    }, 200),
    [],
  );

  return (
    <Flex justifyContent="space-between">
      {/* 작성자 */}
      <Flex alignItems="center" gap={1} fontSize="15px">
        {roadmapSet?.user && (
          <RouterLink to={`/Roadmap/User/${roadmapSet.user.id}`}>
            <Flex alignItems="center">
              <Avatar mr={2} size="sm" name={roadmapSet.user.nickname} src={roadmapSet.user.image} loading="eager" />
              <Text>{roadmapSet?.user?.nickname}</Text>
            </Flex>
          </RouterLink>
        )}
        <span>·</span>
        <Text>{dayjs(roadmapSet?.roadmap?.created_at).fromNow()}</Text>
      </Flex>

      <Flex alignItems="center" gap={1}>
        {/* 다운로드 */}
        <Menu>
          <Tooltip label="다운로드">
            <MenuButton
              as={IconButton}
              aria-label="bookmark"
              icon={<BsDownload size="17px" />}
              variant="ghost"
            ></MenuButton>
          </Tooltip>
          <MenuList fontSize="sm">
            <MenuItem icon={<BiImageAlt size="20px" />} onClick={onClickDownloadImage}>
              이미지 다운로드
            </MenuItem>
          </MenuList>
        </Menu>

        {/* 복사 */}
        <Tooltip label="복사">
          <IconButton aria-label="clone" icon={<IoCopyOutline size="18px" />} variant="ghost" onClick={onClickCopy} />
        </Tooltip>

        {/* 북마크 */}
        <Tooltip label="북마크">
          <IconButton
            colorScheme={isBookmark ? 'linkedin' : 'gray'}
            aria-label="bookmark"
            icon={isBookmark ? <BsFillBookmarkFill /> : <BsBookmark />}
            variant="ghost"
            onClick={onClickBookmark}
          />
        </Tooltip>

        {/* 공유 */}
        <Menu>
          <Tooltip label="공유">
            <MenuButton as={IconButton} aria-label="bookmark" icon={<BsShare />} variant="ghost"></MenuButton>
          </Tooltip>
          <MenuList fontSize="sm">
            <MenuItem icon={<FiCopy size="15px" />} onClick={onClickShareCopyURL}>
              URL 복사
            </MenuItem>
            <MenuItem icon={<BsFacebook size="15px" />} onClick={onClickShareFacebook}>
              Facebook
            </MenuItem>
            <MenuItem icon={<BsTwitter size="15px" />} onClick={onClickShareTwitter}>
              Twitter
            </MenuItem>
          </MenuList>
        </Menu>

        {/* 좋아요 */}
        <Tooltip label="좋아요">
          <Button leftIcon={<AiFillHeart />} colorScheme={isLike ? 'red' : 'gray'} ml={3} onClick={onClickLike}>
            <Text>{roadmapSet?.roadmap.like ?? 0}</Text>
          </Button>
        </Tooltip>
      </Flex>

      <CloneConfirmDialog isOpen={isOpenCopy} onClose={onCloseCopy} onCopy={onCopyRoadmap} />
      <LoginDialog isOpen={isOpenLogin} onClose={onCloseLogin} />
    </Flex>
  );
};
