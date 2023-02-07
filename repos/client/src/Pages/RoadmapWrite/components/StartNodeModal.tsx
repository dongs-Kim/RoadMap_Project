import { useCallback, useReducer, useEffect, ChangeEvent } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { RoadmapItem } from '../../../Interface/roadmap';

//---------------------
// state
//---------------------
type State = RoadmapItem;
const initialState: State = {
  name: '',
  description: '',
  bgcolor: '#ffffff',
  border: true,
  status: '',
};
type SetRoadmapItemAction = { type: 'setRoadmapItem'; roadmapItem: RoadmapItem };
type ClearRoadmapItemAction = { type: 'clearRoadmapItem' };
type SetNameAction = { type: 'setName'; name: string };
type SetBgColorAction = { type: 'setBgColor'; bgcolor: string };
type SetDescriptionAction = { type: 'setDescription'; description: string };
type SetBorderAction = { type: 'setBorder'; border: boolean };
type Action =
  | SetBgColorAction
  | SetRoadmapItemAction
  | SetNameAction
  | SetDescriptionAction
  | SetBorderAction
  | ClearRoadmapItemAction;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setDescription':
      return { ...state, description: action.description };
    case 'setBgColor':
      return { ...state, bgcolor: action.bgcolor };
    case 'setBorder':
      return { ...state, border: action.border };
    case 'setRoadmapItem':
      return { ...action.roadmapItem };
    case 'clearRoadmapItem':
      return initialState;
    default:
      throw new Error();
  }
}

//---------------------
// component
//---------------------
interface StartNodeModalProps {
  isOpen: boolean;
  onClose(data?: RoadmapItem): void;
  roadmapItem?: RoadmapItem;
}

export const StartNodeModal = ({ isOpen, onClose, roadmapItem }: StartNodeModalProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 데이터 설정
  useEffect(() => {
    if (roadmapItem) {
      dispatch({ type: 'setRoadmapItem', roadmapItem });
    }
  }, [roadmapItem]);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setName', name: e.target.value });
  }, []);

  const onClickApply = useCallback(() => {
    onClose({
      ...state,
    });
    dispatch({ type: 'clearRoadmapItem' });
  }, [onClose, state]);

  const onCloseModal = useCallback(() => {
    onClose();
    dispatch({ type: 'clearRoadmapItem' });
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>항목 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <InputLeftAddon>
              <Text fontSize="sm">항목명</Text>
            </InputLeftAddon>
            <Input placeholder="항목명을 입력하세요" value={state.name} onChange={onChangeName} />
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClickApply}>
            적용
          </Button>
          <Button variant="ghost" onClick={onCloseModal}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
