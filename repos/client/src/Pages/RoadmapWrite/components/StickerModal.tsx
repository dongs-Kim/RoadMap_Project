import { useCallback, useReducer, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Textarea,
} from '@chakra-ui/react';
import { RoadmapItem } from '../../../Interface/roadmap';
import { ColorResult } from 'react-color';
import { ColorPicker } from './ColorPicker';

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
type SetBgColorAction = { type: 'setBgColor'; bgcolor: string };
type SetDescriptionAction = { type: 'setDescription'; description: string };
type SetBorderAction = { type: 'setBorder'; border: boolean };
type Action = SetBgColorAction | SetRoadmapItemAction | SetDescriptionAction | SetBorderAction | ClearRoadmapItemAction;

function reducer(state: State, action: Action): State {
  switch (action.type) {
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
interface StickerModalProps {
  isOpen: boolean;
  onClose(data?: RoadmapItem): void;
  roadmapItem?: RoadmapItem;
}

export const StickerModal = ({ isOpen, onClose, roadmapItem }: StickerModalProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 데이터 설정
  useEffect(() => {
    if (roadmapItem) {
      dispatch({ type: 'setRoadmapItem', roadmapItem });
    }
  }, [roadmapItem]);

  const onChangeBgColor = useCallback((color: ColorResult) => {
    dispatch({ type: 'setBgColor', bgcolor: color.hex });
  }, []);

  const onChangeBorder = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setBorder', border: e.target.checked });
  }, []);

  const onChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'setDescription', description: e.target.value });
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
        <ModalHeader>스티커 작성</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex mb={5} alignItems="center" justifyContent="space-between">
            {/* 배경색 */}
            <Box flex={1} mr={2}>
              <ColorPicker color={state.bgcolor} onChange={onChangeBgColor} />
            </Box>

            {/* 테두리 */}
            <FormControl display="flex" alignItems="center" width={90} justifyContent="flex-end">
              <FormLabel mb="0" color="#666" fontWeight="thin" fontSize="sm">
                테두리
              </FormLabel>
              <Switch colorScheme="teal" isChecked={state.border} onChange={onChangeBorder} />
            </FormControl>
          </Flex>

          {/* 내용 */}
          <Textarea
            placeholder="내용을 작성하세요"
            height={300}
            value={state.description}
            onChange={onChangeDescription}
          />
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
