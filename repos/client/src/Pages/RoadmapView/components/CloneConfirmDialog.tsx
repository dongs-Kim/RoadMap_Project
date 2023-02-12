import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface CloneConfirmDialogProps {
  isOpen: boolean;
  onCopy(): void;
  onClose(): void;
}

export const CloneConfirmDialog = ({ isOpen, onCopy, onClose }: CloneConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            로드맵 복사
          </AlertDialogHeader>

          <AlertDialogBody>내 로드맵으로 복사하시겠습니까?</AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="red" mr={3} onClick={onCopy}>
              복사
            </Button>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
