/* eslint-disable @typescript-eslint/no-empty-function */
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';

interface LoadingProps {
  isOpen: boolean;
}

export const Loading = ({ isOpen }: LoadingProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none" m="auto" alignItems="center" justifyContent="center">
        <BeatLoader color="#697689" />
      </ModalContent>
    </Modal>
  );
};
