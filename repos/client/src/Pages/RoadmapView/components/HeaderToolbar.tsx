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
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { AiFillHeart } from 'react-icons/ai';
import { BiImageAlt } from 'react-icons/bi';
import { BsBookmark, BsDownload, BsFacebook, BsFillBookmarkFill, BsShare, BsTwitter } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { IoCopyOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { useCallback } from 'react';
import _ from 'lodash';
import { toPng } from 'html-to-image';
import { downloadImage } from '../../../Utils/roadmap';
import { RoadmapSetDto } from '../../../Interface/roadmap';
import { useNavigate } from 'react-router-dom';
import { CloneConfirmDialog } from './CloneConfirmDialog';
import { toggleBookmark } from '../../../store/roadmapViewSlice';
import { toastError, toastSuccess } from '../../../Utils/toast';
import { bookmarkRoadmapAsync, unbookmarkRoadmapAsync } from '../../../Apis/roadmapApi';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const HeaderToolbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const roadmapSet = useAppSelector((state) => state.roadmapView.roadmapSet);
  const isBookmark = useAppSelector((state) => state.roadmapView.isStore);
  const { isOpen: isOpenCopy, onOpen: onOpenCopy, onClose: onCloseCopy } = useDisclosure();

  const onClickDownloadImage = useCallback(
    _.debounce(async () => {
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

  const onCopyRoadmap = useCallback(
    _.debounce(async () => {
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
    _.debounce(() => {
      if (!roadmapSet?.roadmap.id) {
        return;
      }

      //@TODO 로그인 체크

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
    [dispatch, isBookmark],
  );

  const onClickShareCopyURL = useCallback(
    _.debounce(() => {
      navigator.clipboard.writeText(window.location.href);
      toastSuccess('URL이 복사되었습니다');
    }, 200),
    [],
  );

  const onClickShareFacebook = useCallback(
    _.debounce(() => {
      window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURI(window.location.href)}`);
    }, 200),
    [],
  );

  const onClickShareTwitter = useCallback(
    _.debounce(() => {
      if (roadmapSet) {
        window.open(
          `https://twitter.com/intent/tweet?text=${roadmapSet.roadmap.title}&url=${encodeURI(window.location.href)}`,
        );
      }
    }, 200),
    [],
  );

  return (
    <Flex pb={5} mb={5} justifyContent="space-between">
      {/* 작성자 */}
      <Flex alignItems="center" gap={1} fontSize="15px">
        <Link mr={1}>
          <Avatar size="sm" name={roadmapSet?.user?.nickname} src={roadmapSet?.user?.image} />
        </Link>
        <Link>
          <Text>{roadmapSet?.user?.nickname}</Text>
        </Link>
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
          <IconButton aria-label="clone" icon={<IoCopyOutline size="18px" />} variant="ghost" onClick={onOpenCopy} />
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
          <Button
            leftIcon={<AiFillHeart />}
            // colorScheme={isLike ? 'gray' : 'red'}
            colorScheme={'red'}
            ml={3}
          >
            <Text>10</Text>
          </Button>
        </Tooltip>
      </Flex>

      <CloneConfirmDialog isOpen={isOpenCopy} onClose={onCloseCopy} onCopy={onCopyRoadmap} />
    </Flex>
  );
};
