import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LoginDialogProps {
  isOpen: boolean;
  onClose(): void;
}

export const LoginDialog = ({ isOpen, onClose }: LoginDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const onClickLogin = useCallback(() => {
    navigate('/login', { state: { forward: location.pathname } });
  }, [navigate, location]);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            로그인 확인
          </AlertDialogHeader>

          <AlertDialogBody>
            로그인이 필요한 기능입니다
            <br />
            로그인 하시겠습니까?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="red" mr={3} onClick={onClickLogin}>
              로그인
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
