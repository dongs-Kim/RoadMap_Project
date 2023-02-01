import { Button, Heading, Textarea, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { ChangeEvent, useCallback, useState } from 'react';
import { ReplyDeleteDialog } from '../../Components/Dialog/ReplyDeleteDialog';
import { ReplyInputModal } from '../../Components/Modal/ReplyInputModal';
import { IReply, IUser } from '../../Interface/db';
import { toastError, toastSuccess } from '../../Utils/toast';

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
    <div>
      <Heading size="md">댓글</Heading>
      <div>
        <Textarea value={contents} onChange={onChangeReply} />
        <Button colorScheme="teal" size="sm" onClick={onClickSaveReply}>
          댓글 작성
        </Button>
      </div>
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
            <div>
              <span>{reply.user_nickname}</span>
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
          </li>
        ))}
      </ul>

      <ReplyDeleteDialog isOpen={isOpen} onClose={onClose} onDelete={onDeleteReply} />
      {isOpenModal && toUpdateReply && (
        <ReplyInputModal data={toUpdateReply} onClose={onCloseModal} onUpdate={onUpdateReply} />
      )}
    </div>
  );
};
