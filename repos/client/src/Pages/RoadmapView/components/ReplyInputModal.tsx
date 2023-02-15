import { useState, useCallback, ChangeEvent } from 'react';
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import { toastError, toastSuccess } from '../../../Utils/toast';
import { IReply } from '../../../Interface/db';

interface ReplyInputModalProps {
  isOpen: boolean;
  onClose(): void;
  onUpdate(contents: string): void;
  data: IReply | null;
}

export const ReplyInputModal = ({ isOpen, onClose, onUpdate, data }: ReplyInputModalProps) => {
  const [contents, setContents] = useState<string>(data?.contents ?? '');

  const onChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  }, []);

  const onModalClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const onSave = useCallback(async () => {
    if (!contents) {
      toastError('댓글을 작성해 주세요');
      return;
    }
    onUpdate(contents);
  }, [onUpdate, contents]);

  return (
    <Modal isOpen={isOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>댓글 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Textarea value={contents} onChange={onChangeDescription} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSave}>
            저장
          </Button>
          <Button variant="ghost" onClick={onModalClose}>
            취소z
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
