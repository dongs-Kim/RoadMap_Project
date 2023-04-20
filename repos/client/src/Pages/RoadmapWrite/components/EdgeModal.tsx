import { useCallback, useReducer, useEffect } from 'react';
import {
  Box,
  Button,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { EdgeData, EdgeLineType, EN_EDGE_LINE_TYPE } from '../../../Interface/roadmap';
import { ColorResult } from 'react-color';
import { ColorPicker } from './ColorPicker';

//---------------------
// state
//---------------------
type State = EdgeData;
const initialState: State = {
  color: '#2b78e4',
  lineType: 'solid',
};
type SetEdgeDataAction = { type: 'setEdgeData'; data: State };
type ClearEdgeDataAction = { type: 'clearEdgeData' };
type SetColorAction = { type: 'setColor'; color: string };
type SetLineTypeAction = { type: 'setLineType'; lineType: EdgeLineType };
type Action = SetEdgeDataAction | SetColorAction | SetLineTypeAction | ClearEdgeDataAction;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setColor':
      return { ...state, color: action.color };
    case 'setLineType':
      return { ...state, lineType: action.lineType };
    case 'setEdgeData':
      return { ...action.data };
    case 'clearEdgeData':
      return initialState;
    default:
      throw new Error();
  }
}

//---------------------
// component
//---------------------
interface EdgeModalProps {
  isOpen: boolean;
  onClose(data?: EdgeData): void;
  data?: EdgeData;
}

export const EdgeModal = ({ isOpen, onClose, data }: EdgeModalProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 데이터 설정
  useEffect(() => {
    if (data) {
      dispatch({ type: 'setEdgeData', data });
    }
  }, [isOpen, data]);

  const onChangeColor = useCallback((color: ColorResult) => {
    dispatch({ type: 'setColor', color: color.hex });
  }, []);

  const onChangeLineType = useCallback((lineType: EdgeLineType) => {
    dispatch({ type: 'setLineType', lineType });
  }, []);

  const onClickApply = useCallback(() => {
    onClose({
      ...state,
    });
    dispatch({ type: 'clearEdgeData' });
  }, [onClose, state]);

  const onCloseModal = useCallback(() => {
    onClose();
    dispatch({ type: 'clearEdgeData' });
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>선 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* 선 색 */}
          <Box mb={5}>
            <ColorPicker color={state.color} isLine={true} onChange={onChangeColor} />
          </Box>

          {/* 선 유형 */}
          <InputGroup mb={5}>
            <InputLeftAddon>
              <Text fontSize="sm">선 유형</Text>
            </InputLeftAddon>
            <RadioGroup
              display="flex"
              alignItems="center"
              border="1px solid"
              borderColor="inherit"
              pl={5}
              w="100%"
              borderRadius="md"
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              value={state.lineType}
              onChange={onChangeLineType}
            >
              <Stack spacing={4} direction="row">
                {Object.entries(EN_EDGE_LINE_TYPE).map(([key, value]) => (
                  <Radio key={key} value={key}>
                    {value}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
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
