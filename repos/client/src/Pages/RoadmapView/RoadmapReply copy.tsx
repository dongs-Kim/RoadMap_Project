import { ChangeEvent, useCallback, useState } from 'react';
import axios from 'axios';
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
import { ReplyDeleteDialog } from '../../Components/Dialog/ReplyDeleteDialog';
import { ReplyInputModal } from '../../Components/Modal/ReplyInputModal';
import { IReply, IUser } from '../../Interface/db';
import { toastError, toastSuccess } from '../../Utils/toast';
import { BsDownload } from 'react-icons/bs';
import { BiDotsVerticalRounded, BiImageAlt } from 'react-icons/bi';

interface RoadmapReplyProps {
  replies: IReply[];
  user?: IUser | null;
  onSave?(reply: string): void;
  onDelete?(): void;
  onUpdate?(): void;
}

export const RoadmapReply = ({ replies, user, onSave, onDelete, onUpdate }: RoadmapReplyProps) => {
  const [contents, setContents] = useState('');
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);
  const [toUpdateReply, setToUpdateReply] = useState<IReply | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();

  const onChangeReply = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  }, []);

  const onClickSaveReply = useCallback(() => {
    onSave?.(contents);
    setContents('');
  }, [onSave, contents]);

  const isMyReply = useCallback(
    (user_id: string) => {
      return user && user_id === user.id;
    },
    [user],
  );

  const onClickDelete = useCallback(
    (id: string) => {
      setToDeleteId(id);
      onOpen();
    },
    [onOpen],
  );

  const onClickUpdate = useCallback(
    (reply: IReply) => {
      setToUpdateReply(reply);
      onOpenModal();
    },
    [onOpenModal],
  );

  const onDeleteReply = useCallback(async () => {
    try {
      await axios.delete(`/api/replies/${toDeleteId}`);
      toastSuccess('댓글을 삭제했습니다');
    } catch {
      toastError('댓글을 삭제하지 못했습니다');
    }
    onClose();
    setToDeleteId(null);
    onDelete?.();
  }, [toDeleteId, onClose, onDelete]);

  const onUpdateReply = useCallback(() => {
    onCloseModal();
    setToUpdateReply(null);
    onUpdate?.();
  }, [onCloseModal, onUpdate]);

  return (
    <Flex flexDir="column">
      <Divider mb={3} />
      <Flex mb={3}>
        <Text fontWeight="bold">댓글 {replies.length}</Text>
      </Flex>

      <Flex flexDir="column" p={3}>
        <Flex>
          <Avatar size="md" mr={3} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Textarea
            as={TextareaAutosize}
            placeholder="댓글을 작성하세요"
            mb={3}
            value={contents}
            onChange={onChangeReply}
          />
        </Flex>

        <Flex justifyContent="flex-end">
          <Button colorScheme="teal" size="sm" onClick={onClickSaveReply}>
            댓글 쓰기
          </Button>
        </Flex>
      </Flex>
      <Divider mt={3} mb={3} />

      <List>
        {replies.map((reply) => (
          <ListItem key={reply.id}>
            <Flex flexDir="column">
              <Flex justifyContent="space-between">
                <Flex alignItems="center">
                  <Avatar size="md" mr={3} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                  <Text>{reply.user_nickname}</Text>
                  <span>·</span>
                  {/* <Text>{new Date(reply.created_at).toLocaleDateString()}</Text> */}
                  <Text>1일전</Text>
                </Flex>
                <Flex>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="bookmark"
                      icon={<BiDotsVerticalRounded size="17px" />}
                      variant="ghost"
                    ></MenuButton>

                    <MenuList fontSize="sm">
                      <MenuItem as="a" href="#" icon={<BiImageAlt size="20px" />}>
                        수정
                      </MenuItem>
                      <MenuItem as="a" href="#" icon={<BiImageAlt size="20px" />}>
                        삭제
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>

              <Flex>{reply.contents}</Flex>
            </Flex>
            <div>
              <span>{reply.user_nickname}</span>
              <span>·</span>
              <span>{new Date(reply.created_at).toLocaleDateString()}</span>
              {isMyReply(reply.user_id) && (
                <>
                  <Button size="xs" onClick={() => onClickUpdate(reply)}>
                    수정
                  </Button>
                  <Button size="xs" onClick={() => onClickDelete(reply.id)}>
                    삭제
                  </Button>
                </>
              )}
            </div>
            <div>{reply.contents}</div>
          </ListItem>
        ))}
      </List>

      <ReplyDeleteDialog isOpen={isOpen} onClose={onClose} onDelete={onDeleteReply} />
      {isOpenModal && toUpdateReply && (
        <ReplyInputModal data={toUpdateReply} onClose={onCloseModal} onUpdate={onUpdateReply} />
      )}
    </Flex>
  );
};
