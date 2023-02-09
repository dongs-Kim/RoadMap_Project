import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { IReply } from '../../../Interface/db';
import { toastError, toastSuccess } from '../../../Utils/toast';

interface SearchPasswordModalProps {
  isOpen: boolean;
  onClose(): void;
  data: IReply;
}

const SearchPasswordModal = ({ onClose, isOpen, data }: SearchPasswordModalProps) => {
  const [contents, setContents] = useState<string>(data.contents);

  const onChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  }, []);

  const onModalClose = useCallback(() => {
    onClose();
  }, [onClose]);



  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchPasswordModal;
