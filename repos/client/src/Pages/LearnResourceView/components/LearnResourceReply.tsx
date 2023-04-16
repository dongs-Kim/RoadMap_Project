import { ChangeEvent, useCallback, useMemo, useState } from 'react';
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
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
import _ from 'lodash';
import dayjs from 'dayjs';
import { IReply } from '../../../Interface/db';
import { toastError } from '../../../Utils/toast';
import { LoginDialog } from '../../../Components/Dialog/LoginDialog';
import { useUser } from '../../../Hooks/dataFetch/useUser';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { ReplyInputModal } from './ReplyInputModal';
import { ReplyDeleteDialog } from './ReplyDeleteDialog';
import {
  deleteLearnResourceReplyAsync,
  saveLearnResourceReplyAsync,
  updateLearnResourceReplyAsync,
} from '../../../Apis/learnResourceApi';
import { getLearnResourceReplies } from '../../../store/learnResourceViewSlice';

interface LearnResourceReplyProps {
  learn_resource_id?: string;
  setLoading(loading: boolean): void;
}

export const LearnResourceReply = ({ learn_resource_id, setLoading }: LearnResourceReplyProps) => {
  const replies = useAppSelector((state) => state.learnResourceView.replies);
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

  const loadReplies = useCallback(async () => {
    if (!learn_resource_id) {
      return;
    }
    setLoading(true);
    try {
      await dispatch(getLearnResourceReplies({ id: learn_resource_id }));
    } finally {
      setLoading(false);
    }
  }, [dispatch, learn_resource_id, setLoading]);

  const onClickSaveReply = useMemo(() => {
    return _.debounce(async () => {
      if (!learn_resource_id) {
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
        await saveLearnResourceReplyAsync(learn_resource_id, contents);
        setContents('');
        loadReplies();
      } catch {
        toastError('댓글을 저장하지 못했습니다');
      }
    }, 200);
  }, [contents, isLogined, loadReplies, onOpenLogin, learn_resource_id]);

  const isMyReply = useCallback(
    (user_id: string) => {
      return user && user_id === user.id;
    },
    [user],
  );

  const onClickDelete = useMemo(() => {
    return _.debounce((id: string) => {
      setToDeleteId(id);
      onOpenDelete();
    }, 200);
  }, [onOpenDelete]);

  const onClickUpdate = useMemo(() => {
    return _.debounce((reply: IReply) => {
      setToUpdateReply({ ...reply });
      onOpenModal();
    }, 200);
  }, [onOpenModal]);

  const onDeleteReply = useCallback(async () => {
    if (!toDeleteId || !learn_resource_id) {
      return;
    }
    try {
      await deleteLearnResourceReplyAsync(toDeleteId);
    } catch {
      toastError('댓글을 삭제하지 못했습니다');
    }
    onCloseDelete();
    setToDeleteId(null);
    loadReplies();
  }, [toDeleteId, learn_resource_id, onCloseDelete, loadReplies]);

  const onUpdateReply = useCallback(
    async (contents: string) => {
      if (!toUpdateReply || !learn_resource_id) {
        return;
      }
      try {
        await updateLearnResourceReplyAsync(toUpdateReply.id, contents);
      } catch {
        toastError('댓글을 저장하지 못했습니다');
      }
      onCloseModal();
      setToUpdateReply(null);
      loadReplies();
    },
    [onCloseModal, toUpdateReply, learn_resource_id, loadReplies],
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
                  <RouterLink to={`/Roadmap/User/${reply.user_id}`}>
                    <Flex alignItems="center">
                      <Avatar size="sm" mr={2} name={reply.user_nickname} src={reply.user_image} />
                      <Text>{reply.user_nickname}</Text>
                    </Flex>
                  </RouterLink>
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
