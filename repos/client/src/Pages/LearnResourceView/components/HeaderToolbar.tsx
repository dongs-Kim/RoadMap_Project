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
import { BsFacebook, BsShare, BsTwitter } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { useCallback, useMemo } from 'react';
import _ from 'lodash';
import { toastSuccess } from '../../../Utils/toast';
import { useUser } from '../../../Hooks/dataFetch/useUser';
import { LoginDialog } from '../../../Components/Dialog/LoginDialog';
import { likeLearnResourceAsync, unlikeLearnResourceAsync } from '../../../Apis/learnResourceApi';
import { toggleLike } from '../../../store/learnResourceViewSlice';
import { LearnResourceDeleteDialog } from '../../MyLearnResource/components/LearnResourceDeleteDialog';
import axios from 'axios';

export const HeaderToolbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const learnResource = useAppSelector((state) => state.learnResourceView.learnResource);
  const isLike = useAppSelector((state) => state.learnResourceView.isLike);
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { userData, isLogined } = useUser();

  const onClickLike = useMemo(() => {
    return _.throttle(() => {
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
    }, 200);
  }, [dispatch, learnResource, isLogined, isLike, onOpenLogin]);

  const onClickShareCopyURL = useMemo(() => {
    return _.throttle(() => {
      navigator.clipboard.writeText(window.location.href);
      toastSuccess('URL이 복사되었습니다');
    }, 200);
  }, []);

  const onClickShareFacebook = useMemo(() => {
    return _.throttle(() => {
      window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURI(window.location.href)}`);
    }, 200);
  }, []);

  const onClickShareTwitter = useMemo(() => {
    return _.throttle(() => {
      if (learnResource) {
        window.open(
          `https://twitter.com/intent/tweet?text=${learnResource.name}&url=${encodeURI(window.location.href)}`,
        );
      }
    }, 200);
  }, [learnResource]);

  const onClickDelete = useCallback(() => {
    onOpenDelete();
  }, [onOpenDelete]);

  const onDelete = useCallback(async () => {
    try {
      await axios.delete(`/api/learn-resource/${learnResource?.id}`);
      toastSuccess('삭제했습니다');
      navigate(-1);
    } finally {
      onCloseDelete();
    }
  }, [learnResource?.id, navigate, onCloseDelete]);

  return (
    <Flex justifyContent="space-between" mb={5} flexDir={{ base: 'column', md: 'row' }} gap={2}>
      {/* 작성자 */}
      <Flex alignItems="center" gap={1} fontSize="15px">
        {
          <RouterLink to={`/Roadmap/User/${learnResource?.user_id}`}>
            <Flex alignItems="center">
              <Avatar
                mr={2}
                size="sm"
                name={learnResource?.user_nickname}
                src={learnResource?.user_image}
                loading="eager"
              />
              <Text>{learnResource?.user_nickname}</Text>
            </Flex>
          </RouterLink>
        }
        <span>·</span>
        <Text>{dayjs(learnResource?.created_at).fromNow()}</Text>
      </Flex>

      <Flex alignItems="center" gap={1}>
        {/* 수정/삭제 */}
        {userData?.id === learnResource?.user_id && (
          <Flex gap={3} mr={3}>
            <Link as={RouterLink} color="teal" fontSize="11pt" to={`/LearnResource/write/${learnResource?.id}`}>
              수정
            </Link>
            <Link color="teal" fontSize="11pt" onClick={onClickDelete}>
              삭제
            </Link>
          </Flex>
        )}

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
            <Text>{learnResource?.like ?? 0}</Text>
          </Button>
        </Tooltip>
      </Flex>

      <LearnResourceDeleteDialog isOpen={isOpenDelete} onClose={onCloseDelete} onDelete={onDelete} />
      <LoginDialog isOpen={isOpenLogin} onClose={onCloseLogin} />
    </Flex>
  );
};
