/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback, useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  Flex,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';
import { IReply } from '../../../Interface/db';
import { toastError, toastSuccess } from '../../../Utils/toast';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import _ from 'lodash';
import { LoginDialog } from '../../../Components/Dialog/LoginDialog';
import { useUser } from '../../../Hooks/dataFetch/useUser';
import { deleteReplyAsync, saveReplyAsync, updateReplyAsync } from '../../../Apis/roadmapApi';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { getReplies } from '../../../store/roadmapViewSlice';
import dayjs from 'dayjs';
import { ReplyInputModal } from './ReplyInputModal';
import { ReplyDeleteDialog } from './ReplyDeleteDialog';

interface RoadmapReplyProps {
  roadmap_id?: string;
  setLoading(loading: boolean): void;
}

export const RoadmapReply = ({ roadmap_id, setLoading }: RoadmapReplyProps) => {
  const replies = useAppSelector((state) => state.roadmapView.replies);
  const [contents, setContents] = useState('');
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);
  const [toUpdateReply, setToUpdateReply] = useState<IReply | null>(null);
  const { userData: user, isLogined } = useUser();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const dispatch = useAppDispatch();

  const onChangeReply = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  }, []);

  const onClickSaveReply = useCallback(
    _.debounce(async () => {
      if (!roadmap_id) {
        return;
      }
      if (!isLogined) {
        onOpenLogin();
        return;
      }
      if (!contents) {
        toastError('댓글을 작성해 주세요');
        return;
      }

      try {
        await saveReplyAsync(roadmap_id, contents);
        toastSuccess('댓글을 저장했습니다');
        setContents('');
        loadReplies();
      } catch {
        toastError('댓글을 저장하지 못했습니다');
      }
    }, 200),
    [contents, isLogined, onOpenLogin],
  );

  const isMyReply = useCallback(
    (user_id: string) => {
      return user && user_id === user.id;
    },
    [user],
  );

  const onClickDelete = useCallback(
    _.debounce((id: string) => {
      setToDeleteId(id);
      onOpenDelete();
    }, 200),
    [onOpenDelete],
  );

  const onClickUpdate = useCallback(
    _.debounce((reply: IReply) => {
      setToUpdateReply(reply);
      onOpenModal();
    }, 200),
    [onOpenModal],
  );

  const onDeleteReply = useCallback(async () => {
    if (!toDeleteId || !roadmap_id) {
      return;
    }
    try {
      await deleteReplyAsync(toDeleteId);
      toastSuccess('댓글을 삭제했습니다');
    } catch {
      toastError('댓글을 삭제하지 못했습니다');
    }
    onCloseDelete();
    setToDeleteId(null);
    loadReplies();
  }, [toDeleteId, onCloseDelete]);

  const loadReplies = useCallback(async () => {
    if (!roadmap_id) {
      return;
    }
    setLoading(true);
    try {
      await dispatch(getReplies({ id: roadmap_id }));
    } finally {
      setLoading(false);
    }
  }, []);

  const onUpdateReply = useCallback(
    async (contents: string) => {
      if (!toUpdateReply || !roadmap_id) {
        return;
      }
      try {
        await updateReplyAsync(toUpdateReply.id, contents);
        toastSuccess('댓글을 저장했습니다');
      } catch {
        toastError('댓글을 저장하지 못했습니다');
      }
      onCloseModal();
      setToUpdateReply(null);
      loadReplies();
    },
    [onCloseModal],
  );

  return (
    <Flex flexDir="column">
      <Flex mb={3}>
        <Text fontWeight="bold">댓글 {replies.length}</Text>
      </Flex>

      <Flex flexDir="column" p={3} mb={3}>
        <Flex>
          {user && <Avatar size="sm" mr={3} name={user?.nickname} src={user?.image} />}
          <Textarea
            as={TextareaAutosize}
            placeholder="댓글을 작성하세요"
            mb={3}
            value={contents}
            onChange={onChangeReply}
            disabled={!isLogined}
          />
        </Flex>

        <Flex justifyContent="flex-end">
          <Button colorScheme="teal" size="sm" onClick={onClickSaveReply}>
            댓글 쓰기
          </Button>
        </Flex>
      </Flex>

      <List>
        {replies.map((reply) => (
          <ListItem key={reply.id} mb={10}>
            <Divider mb={5} />
            <Flex flexDir="column">
              <Flex justifyContent="space-between">
                <Flex alignItems="center" gap={1} fontSize="15px">
                  <Avatar size="sm" mr={2} name={reply.user_nickname} src={reply.user_image} />
                  <Text>{reply.user_nickname}</Text>
                  <span>·</span>
                  <Text>{dayjs(reply.created_at).fromNow()}</Text>
                </Flex>
                <Flex>
                  {isMyReply(reply.user_id) && (
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="bookmark"
                        icon={<BiDotsVerticalRounded color="#888" />}
                        variant="ghost"
                      ></MenuButton>

                      <MenuList fontSize="sm" minW="120px">
                        <MenuItem
                          as="a"
                          href="#"
                          icon={<AiOutlineEdit size="20px" />}
                          onClick={() => onClickUpdate(reply)}
                        >
                          수정
                        </MenuItem>
                        <MenuItem
                          as="a"
                          href="#"
                          icon={<AiFillDelete size="20px" />}
                          onClick={() => onClickDelete(reply.id)}
                        >
                          삭제
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
              </Flex>

              <Flex pt={2} fontSize="sm" whiteSpace="pre-line">
                {reply.contents}
              </Flex>
            </Flex>
          </ListItem>
        ))}
      </List>

      <ReplyDeleteDialog isOpen={isOpenDelete} onClose={onCloseDelete} onDelete={onDeleteReply} />
      <ReplyInputModal isOpen={isOpenModal} data={toUpdateReply} onClose={onCloseModal} onUpdate={onUpdateReply} />
      <LoginDialog isOpen={isOpenLogin} onClose={onCloseLogin} />
    </Flex>
  );
};
