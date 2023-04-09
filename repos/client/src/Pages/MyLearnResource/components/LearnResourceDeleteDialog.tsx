import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

export interface LearnResourceDeleteDialogProps {
  isOpen: boolean;
  onDelete(): void;
  onClose(): void;
}

export const LearnResourceDeleteDialog = ({ isOpen, onDelete, onClose }: LearnResourceDeleteDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            학습 리소스 삭제
          </AlertDialogHeader>

          <AlertDialogBody>삭제하시겠습니까? (복구할 수 없습니다)</AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="red" onClick={onDelete}>
              삭제
            </Button>
            <Button ref={cancelRef} onClick={onClose} ml={3}>
              취소
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
