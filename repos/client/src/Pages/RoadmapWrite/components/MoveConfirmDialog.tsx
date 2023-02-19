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

interface MoveConfirmDialogProps {
  isOpen: boolean;
  onMove(): void;
  onClose(): void;
}

export const MoveConfirmDialog = ({ isOpen, onMove, onClose }: MoveConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            페이지 이동
          </AlertDialogHeader>

          <AlertDialogBody>나가시겠습니까? (작성한 것은 복구되지 않습니다)</AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="red" mr={3} onClick={onMove}>
              이동
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
